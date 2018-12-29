<?php
class AppConfig{
 public static $dbParam = array(
 'dbHost' => 'localhost',
'dbUser' => 'root',
'dbPassword' =>'',
'dbName' => '数据库名',
'dbCharset' => 'utf8',
'dbPort' => 3306,
'dbPrefix' => 'test_',
'dbPconnect' => 0,
'dbDebug' => true,
);
}

class Model {
private $version = ''; //mysql版本
private $config = array(); //数据库配置数组
private $class; //当前类名
public $tablepre = 'ts_'; //表前缀
public $db = ''; //库名
public $table = ''; //表名
private static $link; //数据库链接句柄
private $data = array(); //中间数据容器
private $condition = ''; //查询条件
private $fields = array(); //字段信息
private $sql = array(); //sql集合，调试用
public $primaryKey = 'id'; //表主键

//构造函数初始化
public function __construct($dbParam = array()) {
$this->config = (is_array($dbParam) && !empty($dbParam)) ? $dbParam : AppConfig::$dbParam;
$this->connect();
$this->init();
}

//链接数据库
private function connect() {
if($this->config['dbPconnect']) {
self::$link = @mysql_pconnect($this->config['dbHost'], $this->config['dbUser'], $this->config['dbPassword']);
}else{
self::$link = @mysql_connect($this->config['dbHost'], $this->config['dbUser'], $this->config['dbPassword'], true);
}
mysql_errno(self::$link) != 0 && $this->errdie('Could not connect Mysql: ');
$this->db= !empty($this->db) ? $this->db : $this->config['dbName'];

$serverinfo = $this->version();
if ($serverinfo > '4.1' && $this->config['dbCharset']) {
mysql_query("SET character_set_connection=".$this->config['dbCharset'].",character_set_results=".$this->config['dbCharset'].",character_set_client=binary", self::$link);
}
if ($serverinfo > '5.0') {
mysql_query("SET sql_mode=''", self::$link);
}
@mysql_select_db($this->db, self::$link) or $this->errdie('Cannot use database');
return self::$link;
}

//表基本信息初始化
protected function init() {
$this->class = get_class($this);
$this->table = !empty($this->table) ? $this->table : strtolower($this->class);
$this->table = $this->tablepre . $this->table;
return $this;
}

//设置属性值
public function __set($name, $value) {
//exit($value);
$this->data['fields'][$name] = $value;
}

//获取属性值
public function __get($name) {
if(isset($this->data['fields'][$name])) {
return($this->data['fields'][$name]);
}else {
return NULL;
}
}

//字段信息处理
private function implodefields($data) {
if (!is_array($data)) {
$data = array();
}
$this->fields = !empty($this->data['fields']) ? array_merge($this->data['fields'], $data) : $data;
foreach($this->fields as $key => $value) {
$fieldsNameValueStr[] = "`$key`='$value'";
$fieldsNameStr[] = "`$key`";
$fieldsValueStr[] = "'$value'";
}
return array($fieldsNameValueStr, $fieldsNameStr, $fieldsValueStr);
}

//条件判断组装
private function condition($where = NULL) {
if (is_numeric($where)) {
$where = "WHERE `{$this->primaryKey}`='{$where}' LIMIT 1";
}elseif (is_array($where)){
$where = "WHERE `{$this->primaryKey}` in (".implode(',',$where).")";
}elseif(!empty($this->data['condition'])){
//'预留WHERE', 'order', 'group', 'limit' …………等条件关键词处理接口
$where = $where ? "WHERE {$where}" : "WHERE 1";
isset($this->data['condition']['where']) && $where .= ' AND '.$this->data['condition']['where'];
isset($this->data['condition']['group']) && $where .= ' GROUP BY '.$this->data['condition']['group'];
isset($this->data['condition']['order']) && $where .= ' ORDER BY '.$this->data['condition']['order'];
isset($this->data['condition']['limit']) && $where .= ' LIMIT '.$this->data['condition']['limit'];
}else{
$where = "WHERE {$where}";
}
$this->condition = $where;
return $this;
}

//插入数据
public function insert($data = array(), $replace = false) {
$fields = $this->implodefields($data);
$insert = $replace ? 'REPLACE' : 'INSERT';
$sql = "{$insert} INTO `{$this->db}`.`{$this->table}` (".implode(', ',$fields[1]).") values (".implode(', ',$fields[2]).")";
$this->query($sql);
return $this->getInsertId();
}

//更新数据
public function update($data = array() ,$where = '') {
$numargs = func_num_args();
if ($numargs == 1) {
$where = $data;
$data = array();
}
$fields = $this->implodefields($data);
$this->condition($where);
$sql = "UPDATE `{$this->db}`.`{$this->table}` SET ".implode(', ',$fields[0])." {$this->condition}";
$this->query($sql);
return $this->getAffectedRows();
}

//删除数据
public function delete($where = NULL) {
if(!is_array($where) && strtolower(substr(trim($where), 0, 6)) == 'delete'){
$sql = $where;
}else{
$this->condition($where);
$sql = "DELETE FROM `{$this->db}`.`{$this->table}` {$this->condition}";
}
$this->query($sql);
return $this->getAffectedRows();
}

//查询数据
public function select($where = NULL, $fields = '*') {
if(!is_array($where) && strtolower(substr(trim($where), 0, 6)) == 'select'){
$sql = $where;
}else{
$this->condition($where);
$sql = "SELECT {$fields} FROM `{$this->db}`.`{$this->table}` {$this->condition}";
}
return $this->fetch($this->query($sql));
}

//查询一条数据
public function getOne($where, $fields = '*') {
$data = $this->select($where, $fields = '*');
if($data) {
return $data[0];
}
return array();
}

//查询多条数据
public function getAll($where, $fields = '*') {
$data = $this->select($where, $fields = '*');
return $data;
}

//结果数量
public function getCount($where = '', $fields = '*') {
$this->condition($where);
$sql = "SELECT count({$fields}) as count FROM `{$this->db}`.`{$this->table}` {$this->condition}";
$data = $this->query($sql);
if($data){
return @mysql_result($data,0);
}
return 0;
}

//执行sql语句（flag为0返回mysql_query查询后的结果，为1返回lastid，其他返回影响行数，默认为2返回影响行数）
public function query($sql, $flag = '0', $type = '') {
if ($this->config['dbDebug']) {
$startime = $this->microtime_float();
}

//查询
if ($type == 'UNBUFFERED' && function_exists('mysql_unbuffered_query')) {
$result = @mysql_unbuffered_query($sql, self::$link);
} else {
//exit($sql);
$result = @mysql_query($sql, self::$link);
}

//重试
if (in_array(mysql_errno(self::$link), array(2006,2013)) && empty($result) && $this->config['dbPconnect']==0 && !defined('RETRY')) {
define('RETRY',true); @mysql_close(self::$link); sleep(2);
$this->connect();
$result = $this->query($sql);
}

if ($result === false) {
$this->errdie($sql);
}

if ($this->config['dbDebug']) {
$endtime = $this->microtime_float();
$this->sql[] = array($sql,$endtime-$startime);
}
//清空操作数据
$this->data = array();
return $flag == '0' ? $result : ($flag == '1' ? $this->getInsertId() : $this->getAffectedRows());
}

//返回结果$onlyone为true返回一条否则返回所有,$type有MYSQL_ASSOC,MYSQL_NUM,MYSQL_BOTH
public function fetch($result, $onlyone = false, $type = MYSQL_ASSOC) {
if($result){
if ($onlyone) {
$row = @mysql_fetch_array($result, $type);
return $row;
}else{
$rowsRs = array();
while($row=@mysql_fetch_array($result, $type)) {
$rowsRs[] = $row;
}
return $rowsRs;
}
}
return array();
}

//可以运行SELECT，SHOW，EXPLAIN 或 DESCRIBE 等返回一个资源标识符的语句得到返回结果数组
public function show($sql, $onlyone = false) {
return $this->fetch($this->query($sql), $onlyone);
}

// 使用call函数处理同类型函数
private function __call($name, $arguments) {
$callArr = array('on', 'where', 'order', 'between', 'group', 'limit');
if (in_array($name, $callArr)) {
$this->data['condition'][$name] = $arguments[0];
}else{
$this->errdie("function error: function {$name} is not in ($this->class) class exist");
}
return $this;

}

//返回最后一次插入ID
public function getInsertId() {
return @mysql_insert_id(self::$link);
}

//返回受影响行数
public function getAffectedRows() {
return @mysql_affected_rows(self::$link);
}

//获取错误信息
private function error() {
return ((self::$link) ? @mysql_error(self::$link) : @mysql_error());
}

//获取错误信息ID
private function errno() {
return ((self::$link) ? @mysql_errno(self::$link) : @mysql_errno());
}

//获取版本信息
function version() {
if(empty($this->version)) {
$this->version = mysql_get_server_info(self::$link);
}
return $this->version;
}

//打印错误信息
private function errdie($sql = '') {
if ($this->config['dbDebug']) {
die('</BR><B>MySQL ERROR</B></BR>
SQL:'.$sql.'</BR>
ERRNO:'.$this->errno().'</BR>
ERROR:'.$this->error().'</BR>');
}
die('DB ERROR！！！');
}

//获取时间微妙数
private function microtime_float()
{
list($usec, $sec) = explode(" ", microtime());
return ((float)$usec + (float)$sec);
}

//析构函数
public function __destruct() {
echo '<hr>';
$this->config['dbDebug'] && print_r($this->sql);
//unset($this->result);
//unset($this->condition);
//unset($this->data);
}
}

class user extends Model {
//public $db = 'qsf_mvc';
//public $table = 'user';
public $primaryKey = 'uid';
}

$userObj = new user();
//---------------------------------------插入数据方法一-----------------------------------------
//模拟ActiveRecord模式 插入数据
$userObj->username = 'hoho';
$userObj->passwd = '1478522';
$userObj->email = 'qsf.z11@163.com';
$userObj->sex = 1;
$userObj->desc = '清洁工';
$insetId = $userObj->insert();
if ($insetId > 0) {
echo "插入ID为:{$insetId}<BR>";
}

//---------------------------------------插入数据方法二-----------------------------------------
//直接数组做参数插入数据
$userArr = array(
'username' => 'hoho',
'passwd' => '1478522',
'email' => 'qsf.z2121ia@163.com',
'sex' => '1',
'desc' => '厨师',
);
$insetId = $userObj->insert($userArr);
if ($insetId > 0) {
echo "插入ID为:{$insetId}<BR>";
}

//---------------------------------------更新数据方法一----------------------------------------
$userObj->username = 'h111oho';
$userObj->passwd = '1478511122';
$userObj->email = 'qsf111ia@163.com';
$userObj->sex = 1;
$userObj->desc = '清洁工';
$affectedRows1 = $userObj->update(89);
if ($affectedRows1 > 0) {
echo "影响行数为:{$affectedRows1}<BR>";
}

//---------------------------------------更新数据方法二----------------------------------------
//更新记录（传递参数的方式和insert操作一样）
$userArr = array(
'username' => 'hohoho',
'passwd' => '1474rr4448522',
'email' => 'qsf.rrza@165.com',
'sex' => '0',
'desc' => '厨师qq',
);
$affectedRows = $userObj->update($userArr, $insetId);
if ($affectedRows > 0) {
echo "影响行数为:{$affectedRows}<BR>";
}

//----------------------------------------查询数据----------------------------------------------
$userRs0 = $userObj->select(8); //单个主键值
//print_r($userRs0);

$userRs1 = $userObj->select(array(1,5,8)); //多个主键值的数组
//print_r($userRs1);

$userRs2 = $userObj->select('select count(*) as count from user where uid > 20'); //直接完整sql语句
//print_r($userRs2);

$userRs3 = $userObj->select("`uid` > 0"); //where条件
//print_r($userRs3);

$userRs4 = $userObj->getOne("`uid` > 0"); //获取单条记录
//print_r($userRs4);

$usersRs5 = $userObj->getAll("`uid` > 0"); ////获取所有记录
//print_r($usersRs5);

$usersRs6 = $userObj->limit('0,10')->where('uid > 100')->order('uid DESC')->group('username')->select();
//print_r($usersRs6);

//----------------------------------------删除数据-----------------------------------------------
//删除操作传递参数的方式和select操作一样
$userObj->delete(60); //单个主键值
$userObj->delete(array(1,5,8)); //多个主键值的数组
$userObj->delete('delete from user where uid > 100'); //直接完整sql语句
$userObj->delete("`uid` > 100"); //where条件
$userObj->limit('5')->where('uid > 80')->delete();
//----------------------------------------特殊查询-----------------------------------------------
$userShowRs = $userObj->show('show create table user', true); //获取特殊查询的结果,第二个参数代表返回一条结果还是所有的结果
?>