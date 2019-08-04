<?php
header('Content-Type: text/html; charset=utf-8');
//header('Access-Control-Allow-Origin: *');

//$mysqli = new mysqli('localhost', 'root', 'root', 'tst_money');
$mysqli = new mysqli('localhost', 'flymoney', '9L3i8B1g7Y0m0', 'flymoney');
mysqli_set_charset($mysqli,"utf8");

if ($mysqli->connect_errno) {
    echo "Can't connect to db\n";
    echo "Error num: " . $mysqli->connect_errno . "\n";
    echo "error: " . $mysqli->connect_error . "\n";
    exit;
}
$json = isset($_POST['json']) ? $_POST['json'] : '';
$params = json_decode($json, true);

$data = [];

$limitQuery = ' LIMIT 10';
if(isset($params['limit'])) {
    $limit = $params['limit'];
    if($limit == -1) {
        $limitQuery = '';
    } else {
        $limit = intval($limit);
    if($limit > 0) {
        $limitQuery = " LIMIT {$limit}";
    }
}
}

$whereQuery = '';
if(isset($params['date'])) {
    $date = $params['date'];
    //remove time
    $date = preg_replace('#T(.*?)$#', '', $date);
    $date = mysqli_real_escape_string($mysqli, $date);
    $whereQuery = " WHERE DATE(`dateTime`)='{$date}'";
}

$sql = "SELECT * FROM `money` {$whereQuery} ORDER BY dateTime ASC {$limitQuery}";
$result = $mysqli->query($sql);
while ($row = $result->fetch_assoc()) {
    $data['data'][] = $row;
}

$data['count'] = count($data['data']);
$sql = "SELECT count(*) FROM `money` {$whereQuery} ORDER BY dateTime ASC";
$result = $mysqli->query($sql);
$row = $result->fetch_row();
$data['total'] = $row[0];

if(!empty($data['data'])) {
    $data['success'] = true;
} else {
    $data['success'] = false;
}

echo json_encode($data);