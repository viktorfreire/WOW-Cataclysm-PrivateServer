<?php
/**
 * LUA data table parser
 *
 * This file contains the code that parses LUA data tables into a PHP array.
 * Mostly used when extracting information from World of Warcraft addons.
 *
 * @author David Stangeby <david.stangeby@gmail.com>
 * @version 0.1
 * @package WLP
 * @link http://fin.instinct.org/lua/ The code this class was based of
 * @copyright  Copyright (c) 2005-2009 Arctic Solutions (http://www.arcticsolutions.no/)
 * @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt GNU General Public License v2
 */

/**
 * Class that parses the LUA data file file
 *
 * @package WLP
 */
class WLP_Parser implements arrayaccess
{
	/**
	 * The variable contraining the lua lines to be parsed
	 * @var array
	 */
	protected $lua = array();

	/**
	 * The current possition in the array we are parsing
	 * @var integer
	 */
	protected $position = 0;

	/**
	 * The size of the lua array
	 * @var integer
	 */
	protected $lines = 0;

	/**
	 * Array containing the result of the parse
	 * @var array
	 */
	protected $data = array();

	/**
	 * Constructor
	 *
	 * Takes on input, checks if its an array, file or string.
	 *
	 * @param mixed $input Array, file or string to be parsed
	 * @return WLP_Parser
	 */
	public function __construct($input)
	{
		if(is_array($input)) {
			$this->lua = $input;
		} elseif(is_string($input)) {
			if(is_file($input)) {
				$this->lua = file($input);
			} else {
				$this->lua = explode("\n", $input);
			}
		}
		if(is_array($this->lua)) {
			$this->lines = count($this->lua);
		}
		// The array should be bigger than 1 line, else we have probably gotten
		// a invalid file as input.
		if($this->lines <= 1) {
			throw new Exception('Input did not validate as array');
		}
		$this->parse();
		return $this;
	}

	/**
	 * Method for enabling array access to parsed data.
	 *
	 * Sets a value to the array based on offset.
	 *
	 * @param string|integer $offset
	 * @param mixed $value
	 * @return void
	 */
	public function offsetSet($offset, $value) {
		$this->data[$offset] = $value;
	}

	/**
	 * Method for enabling array access to parsed data.
	 *
	 * Checks if value is set at offset.
	 *
	 * @param string|integer $offset
	 * @return void
	 */
	public function offsetExists($offset) {
		return isset($this->data[$offset]);
	}

	/**
	 * Method for enabling array access to parsed data.
	 *
	 * Unsets part of the array based on offset.
	 *
	 * @param string|integer $offset
	 * @return void
	 */
	public function offsetUnset($offset) {
		unset($this->data[$offset]);
	}

	/**
	 * Method for enabling array access to parsed data.
	 *
	 * Gets data from array based on offset.
	 *
	 * @param string|integer $offset
	 * @return void
	 */
	public function offsetGet($offset) {
		return isset($this->data[$offset]) ? $this->data[$offset] : null;
	}

	/**
	 * Returns the array the parsed from the lua file.
	 *
	 * @return array The resulting array from the parse
	 */
	public function toArray()
	{
		return $this->data;
	}

	/**
	 * Starts the parsing of the lua array.
	 *
	 * @return void
	 */
	protected function parse()
	{
		$this->data = $this->parser();
		// Clear the array containing the lua data file to save memory usage.
		unset($this->lua);
	}

	/**
	 * Does the actually parsing of the lua table.
	 *
	 * @return void
	 */
	protected function parser(&$position = false)
	{
		if($position == false) {
			$position = &$this->position;
		}
		$data = array();
		$stop = false;
		if ($position < $this->lines) {
			for ($i = $position; $stop == false;) {
				if ($i >= $this->lines) {
					$stop = true;
					break;
				}
				$i++;
				$strs = @$this->parseLine(utf8_decode($this->lua[$i]));
				if (trim($strs[0]) == "{" && !$strs[1]) {
					$data[] = $this->parser($i);
				} elseif ($strs[1] && $strs[0] == "{") {
					$data[$strs[1]] = $this->parser($i);
				} elseif ($strs[0] == "}") {
					$stop = true;
				} elseif ($strs[1]) {
					if (is_numeric($strs[1])) {
						//this is non-associative array
						$data[] = $strs[0];
					} else {
						$data[$strs[1]] = $strs[0];
					}
				}
			}
		}
		$position = $i;
		return $data;
	}

	/**
	 * Trims of leading and trailing quotationmarks and tailing comman from
	 * the value.
	 *
	 * Example:
	 *  Input: "Value",
	 *  Output: Value
	 *
	 * @param string $string String to be trimmed
	 * @return string Trimmed string
	 */
	protected function trimValue($string)
	{
		if (preg_match('/^(".+"|})(?:,\s*--\s*\[(\d+)\])?$/', trim($string), $m)) {
			$string = $m[1];
		}
		return trim($string, "[]\" \t\n\r\0\x0B,");
	}

	/**
	 * Extracts the Key-Value for array indexing.
	 *
	 * String Example:
	 *  Input: ["Key"]
	 *  Output: Key
	 * Integer Example:
	 *  Input: [0]
	 *  Output: 0
	 *
	 *  @param string $string String to extract array index from
	 *  @return string Array index
	 */
	protected function parseLine($string)
	{
		if (preg_match('/(.+),\s*--\s*\[(\d+)\]$/', trim($string), $m)) {
			return array($this->trimValue($m[1]), $m[2]);
		} elseif (preg_match('/(\[".+"\]|[\w\d_-]+) = (.+)$/', trim($string), $m)) {
			return array($this->trimValue($m[2]), trim($m[1], ' "[]'));
		} else {
			return array($this->trimValue($string), '');
		}
	}
}