<?php
header('Content-Type: application/json');

if(isset($_POST)) {
  $to = "joe.cui@outlook.com"; // this is your Email address
  $from = $_POST['email']; // this is the sender's Email address
  $name = $_POST['name'];
  $subject = "Web form submission";
  $subject2 = "Copy of your web form submission";
  $message = $name . " wrote the following:" . "\n\n" . $_POST['message'];
  $message2 = "Here is a copy of your message " . $name . "\n\n" . $_POST['message'];
  $headers = "From:" . $from;
  $headers2 = "From:" . $to;
  
  if(mail($to,$subject,$message,$headers)) {
    $response_array['status'] = 'success';
    $response_array['name'] = $name;
  } else {
    $response_array['status'] = 'error';
  }
  echo json_encode($response_array);

  mail($from,$subject2,$message2,$headers2);
}
?>