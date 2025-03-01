<?php
if(isset($_REQUEST['what']))
	getdata($_REQUEST['what']);
	
function getdata($what){
	switch($what)
	{
		case "epgp":
			include('data/epgp/lua2epgp.php');
			//$arr = file_get_contents("data/epgp/epgp.lua") ;
			$wlpParser = new WLP_Parser("data/epgp/epgp.lua");
			$arr = $wlpParser->toArray();
			//print_r($arr);
			
			$guild_name = "Alea iacta est";
			$data = array('table' => array());
			$guild = $arr['EPGP_DB']['namespaces']['log']['profiles'][$guild_name];
			$data['table'] 	= $guild['snapshot']['roster_info'];
			$data['log']	= $guild['log'];
			
			$output = array();
			foreach($data['table'] as $player)
			{
				list($ep, $gp) = explode(',', $player[2]);
				$output['players'][] = array('name' => $player[0], 'class' => strtolower($player[1]), 'ep' => $ep, 'gp' => $gp);
			}
			return $output;
			//print_r($output);
			break;
		case "wowhead":		
			//header('Content-type: application/xml');
			echo 'http://www.wowhead.com/item=' . $_REQUEST['item'] . '&xml';
			break;
		case "printpost":
			print_r($_POST);
			break;
		case "updatewowdata":
			$domain = "http://" . $_REQUEST['region'] . ".battle.net/";
			$files = array('battlegroups.txt' 				=> 'api/wow/data/battlegroups/',
						   'character_achievements.txt' 	=> 'api/wow/data/character/achievements',
						   'character_classes.txt'			=> 'api/wow/data/character/classes',
						   'character_races.txt'			=> 'api/wow/data/character/races',
						   'guild_achievements.txt'			=> 'api/wow/data/guild/achievements',
						   'guild_perks.txt'				=> 'api/wow/data/guild/perks',
						   'item_classes.txt'				=> 'api/wow/data/item/classes',
						   'guild_rewards.txt'				=> 'api/wow/data/guild/rewards');
						   
			foreach($files as $filename => $url)
			{
				$ch = curl_init($domain . $url);
				$fp = fopen("data/wowapi/" . $filename, "w");
				
				curl_setopt($ch, CURLOPT_FILE, $fp);
				curl_setopt($ch, CURLOPT_HEADER, 0);
						
				curl_exec($ch);
				curl_close($ch);
			}
			break;
			
		case "smileys":
			$smileys = array(
				';)' => 'wink.gif',
				':(' => 'sad.gif',
				":')" => 'kutsmiley.png',
				":cry:" => 'cry.gif',
				':P' => 'tongue.gif',
				':)' => 'smile.gif',
				':fucku:' => 'fucku.gif',
				':love:' => 'love.gif',
				':slap:' => 'slap.gif',
				':owned:' => 'owned.gif',
				':D' => 'grin.gif',
				':birthday:' => 'birthday.gif',
				':admin:' => 'adminpowah.gif',
				':jerry:' => 'jerry.gif',
				':kiss:' => 'kiss.gif',
				':lol:' => 'lol.gif',
				':offtopic:' => 'offtopic.gif',
				':rip:' => 'rip.gif',
				':rtfm:' => 'rtfm.gif',
				':shoot:' => 'shoot.gif',
				':stfu:' => 'stfu.gif',
				':welcome:' => 'welcome.gif',
				':godance:' => 'dance.gif',
				':fart:' => 'fart.gif',
				':fuck:' => 'fuck.gif',
				':slap2:' => 'slap2.gif',
				':sm:' => 'sm.gif',
				':sm2:' => 'sm2.gif',
				':wauw:' => 'wauw.gif',
				':computerknock:' => 'computerknock.gif',
				':hahaha:' => 'hahaha.gif',
				':knock:' => 'knock.gif',
				':ninja:' => 'ninja.gif',
				':orc:' => 'orc.gif',
				':gopoke:' => 'poke.gif',
				':rofl:' => 'rofl.gif',
				':splash:' => 'splash.gif',
				':stargate:' => 'stargate.gif',
				':wall:' => 'banghead.gif',
				':beer:' => 'beer-fresh.gif',
				':clown:' => 'clown.gif',
				':sherlock:' => 'detective.gif',
				':facepalm:' => 'facepalm.gif',
				':facepalm2:' => 'facepalm2.gif',
				':facepalm3:' => 'facepalm3.gif',
				':fapfap:' => 'fapfap.gif',
				':faqmad:' => 'faq-mad.gif',
				':faqroll:' => 'faq-roll.gif',
				':goodpost:' => 'goodpost.gif',
				':google:' => 'google.gif',
				':hang:' => 'hangnigger.gif',
				':headscratch:' => 'headscratch.gif',
				":irock:" => 'irock.gif',
				':lies:' => 'lies.gif',
				':showasses:' => 'massmoon.gif',
				':nono:' => 'nonono.gif',
				':dramaqueen:' => 'queen.gif',
				':retard:' => 'retard.gif',
				':sf:' => 'sf.gif',
				':stirpot:' => 'stirthepot.gif',
				':wanker:' => 'tard.gif'
				);	
				$return['smileys'] = array();
				foreach($smileys as $txt => $img)
					$return['smileys'][] = array('text' => $txt, 'image' => $img);
					
				echo json_encode($return);
			break;
	}
}
?>