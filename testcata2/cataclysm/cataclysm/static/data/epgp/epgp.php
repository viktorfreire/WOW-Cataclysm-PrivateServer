<?php
include('lua2epgp.php');
class EPGP 
{
	private $guildname;
	private $raw_array;
	
	private $players = array();
	private $snapshot_time = 0;
	
	function __construct($guildname)
	{
		$this->guildname = $guildname;
	}
	function convertLuaToPhp($lua_file_origin, $php_file_destination)
	{
		$wlpParser = new WLP_Parser($lua_file_origin);
		$arr = $wlpParser->toArray();
		
		
		$myFile = "epgp_array.php";
		$fh = fopen($myFile, 'w') or die("can't open file");
		fwrite($fh, '<?php $epgpdata=' . var_export($arr, true) . ' ?>');
		fclose($fh);

	}
	function loadFile($php_file)
	{
		include('epgp_array.php');
		$this->raw_array = $epgpdata;
		@$this->convertRawData();
	}
	private function convertRawData()
	{
		// Reset
		$this->players = array();
		
		$guildData = $this->raw_array['EPGP_DB']['namespaces']['log']['profiles'][$this->guildname];
		$this->snapshot_time = $guildData['snapshot']['time'];
		
		// Make new player array
		foreach($guildData['snapshot']['roster_info'] as $player)
		{

			
			list($ep, $gp) = explode(',', $player[2]);
			if($ep == 0 && $gp == 0) continue;
			$this->players[ $player[0] ] = array('name' 	=> $player[0],
												 'class'	=> strtolower($player[1]),
												 'ep'		=> (int) $ep,
												 'gp'		=> (int) $gp,
												 'pr'		=> @round(@($ep / $gp), 1),
												 'log'		=> array()
												 );
		}
		
		// Add log items
		foreach($guildData['log'] as $player)
		{
			if( ! array_key_exists($player[2], $this->players) )
				continue;
				
			$log = array('time' 		=> $player[0],
						 'currency' 	=> $player[1],
						 'note' 		=> $player[3],
						 'change' 		=> (int) $player[4]);
						 
			$this->players[ $player[2] ]['log'][] = $log;
		}
	}
	function getPlayer()
	{
		return $this->players;
	}
	function getPlayers(){return $this->players;}
}
?>