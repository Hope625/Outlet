<?php
     header('Content-Type:application/json;charset=utf-8');
    include 'connect.php';
    $sql = "select * from ship";
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    echo json_encode($row);
    $conn->close();
?>