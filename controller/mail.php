<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

header('Content-Type: application/json');

if(isset($_POST)) {
  if(!empty($_POST['email']) && !empty($_POST['name']) && !empty($_POST['message'])) {
    $mail = new PHPMailer(true);      
    $name = $_POST['name'];
    //Server settings
    $mail->SMTPDebug = 0; 
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->isSMTP();  // Set mailer to use SMTP
    $mail->Host = 'mail.joesdemosite.com';  // Specify SMTP server
    $mail->SMTPAuth = true;    // Enable SMTP authentication
    $mail->Username = 'info@joesdemosite.com';  // SMTP username
    $mail->Password = '66157843';  // SMTP password
    $mail->SMTPSecure = 'ssl'; // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 465;  // TCP port to connect to

    //Recipients
    $mail->setFrom('info@joesdemosite.com', 'Joe Cui');
    $mail->addAddress('info@joesdemosite.com', 'jds');     
    $mail->addAddress('xiaozhou.cui@gmail.com', 'gmail'); // Add a recipient

    //Content
    $mail->isHTML(true);   // Set email format to HTML
    $mail->Subject = 'Web form submission';
    $mail->Body    = "<p>Email: ".$_POST['email'] . "</p>" . "<p>Name: <b>" . $name . "</b></p>" . "<p>Message: " . $_POST['message'] . "</p>";
    $mail->AltBody = "Email: ".$_POST['email'] . "\n\n" . "Name: " . $name . "\n\n" . "Message:" . "\n\n" . $_POST['message'];

    if($mail->send()) {
      $response['status'] = 'success';
      $response['name'] = $name;
    } else {
      $response['status'] = 'error';
    }
    echo json_encode($response);
  } else {
    $response['status'] = 'empty';
    echo json_encode($response);
  }
}
