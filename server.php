<?php
if( (isset($_POST['code'])) && (isset($_POST['lang'])) && (isset($_POST['input']))){
$url = 'http://api.hackerrank.com/checker/submission.json';
$key = "Enter API KEY FROM HACKERRANK";
$code=$_POST['code'];
$lang=$_POST['lang'];
$input=$_POST['input'];
$data = array('source'=>$code,'lang'=>$lang,"testcases"=>$input,'api_key'=>$key,'wait'=>'true','format'=>'json'); //parameters to be sent
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
echo ($response);
curl_close($curl);
}

?>