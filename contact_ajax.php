<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$name = htmlspecialchars(trim($_POST['name']));
$remail = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$rsub = htmlspecialchars(trim($_POST['subject']));
$rmsg = htmlspecialchars(trim($_POST['message']));


require "./PHPMailer/PHPMailer.php";
require "./PHPMailer/SMTP.php";
require "./PHPMailer/Exception.php";

$mail = new PHPMailer(true);
try {

    //SMTP Settings                           
    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "awaisraza031074@gmail.com"; //enter you email address
    $mail->Password = 'cwtm mddf tzjx ltqi'; //enter you email password
    $mail->Port = 465;
    $mail->SMTPSecure = "ssl";

    //Email Settings
    $mail->isHTML(true);
    $mail->setFrom("awaisraza031074@gmail.com", strip_tags($name));

    $mail->addReplyTo($remail);                         // user's email
    $mail->addAddress("awaisraza031074@gmail.com");     // your inbox

    $mail->Subject = $rsub;
    $mail->Body = $rmsg;

    $mail->send();
    echo "<script>alert('Success')</script>";
} catch (Exception $e) {
    echo "<script>alert('$mail->ErrorInfo')</script>";

}


?>