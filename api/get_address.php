<?php
    header('Content-Type:application/json;charset=utf-8');
    include 'connect.php';
    $userid = isset($_GET['userid']) ? $_GET['userid'] : '';
    $sql = "select * from address where user_id = '$userid'";
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row);
    $conn->close();  
?>