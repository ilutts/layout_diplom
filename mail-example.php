<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_tell'];
$email = $_POST['user_email'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
<<<<<<< HEAD
$mail->Host = 'smtp.test.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'test@test.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'test123'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('test@test.ru'); // от кого будет уходить письмо?
$mail->addAddress('test1@test1.com');     // Кому будет уходить письмо 
=======
$mail->Host = 'smtp.example.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'example@example.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'pass'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('example@example.ru'); // от кого будет уходить письмо?
$mail->addAddress('example-1@example.ru');     // Кому будет уходить письмо 
>>>>>>> bbcdafb2b6690e594a8135dab46de64f30d1962f
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' .$name . ' оставил заявку,<br>его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

<<<<<<< HEAD
$mail->send();

/*if(!$mail->send()) {
   echo 'Error';
} else {
    header('location: thank-you.html');
}*/
=======
if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: thank-you.html');
}
>>>>>>> bbcdafb2b6690e594a8135dab46de64f30d1962f
?>