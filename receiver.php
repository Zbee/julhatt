<?php
require '../_secret_keys.php';
if (isset($_POST["wLink"]) && isset($_POST["hash"])) {
  $verify = $db->query(
    "select * from xmas where MD5(CONCAT(person, pin))='$_POST[hash]'"
  );
  if ($verify->rowCount()!=1) {
    $echo = ["status" => "bad", "updated" => false];
  } else {
    $update = $db->query(
      "UPDATE xmas SET wishlist='$_POST[wLink]' where MD5(CONCAT(person, pin))='$_POST[hash]'"
    );
    $echo = ["status" => "good", "updated" => true];
  }
} else {
  $echo = ["status" => "bad", "updated" => false];
}

echo json_encode($echo);