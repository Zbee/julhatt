<?php
require '../_secret_keys.php';
if (isset($_POST['name']) && isset($_POST['pin'])) {
  $user = $_POST['name'];
  $pin = $_POST['pin'];
  $stmt = $db->query("SELECT * FROM hxmas WHERE person='$user' AND pin='$pin'");
  $rows = $stmt->rowCount();
  if ($rows > 0) {
    $echo = ['status' => 'good'];
  } else {
    $echo = ['status' => 'incorrect'];
  }
} else {
  $echo = ['status' => 'notset'];
}

echo json_encode($echo);