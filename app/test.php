<?php

$url = 'https://www.google.com/recaptcha/api/siteverify';
$data = array("secret " => "6LeE3nUUAAAAAJV2xntZsp2rcjxMelbhyB9E6mY7","response " => "");
$data_string = json_encode($data);
$ch=curl_init($url);


curl_setopt( $ch, CURLOPT_POSTFIELDS, $data_string );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
# Return response instead of printing.
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
# Send request.
$result = curl_exec($ch);
curl_close($ch);
# Print response.

echo "<pre>$result</pre>";

//$response = (object)["data" => "123", "num_entries" => "456"];

//response($result);

function response($data = '', $responseName = 'data')
{
    $res = (object)['error' => '', $responseName => $data];
    exit(json_encode($res));
}
