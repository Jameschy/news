<?php
$randnumber=$_GET['randnumber'];//参数
$username=$_GET['username'];
require 'mysql_connect.php';
mysql_query("update test set username = '$username' where (randnumber) = ('$randnumber')");
?>