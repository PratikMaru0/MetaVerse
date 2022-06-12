// Contract deployed address Polygon :- 0xd6aEe45b23acAA3f0893829395d0Bc493E67a7Ad

// This code is only for reference purposes becoz real smart contract toh humnae deploy kardia hai on POLYGON testnet.

// SPDX-License-Identifier: GPL-3.0;

pragma solidity >= 0.5.0 < 0.9.0;

// Using openZeppelin imports 
import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";

// Name of the Metaverse is ZionVerse.

// Here are making token using ERC721. 
contract Metaverse is ERC721,Ownable{
    constructor() ERC721("Zion","ZIO"){
    }    

    // Using Library provided by Solidity 
    using Counters for Counters.Counter;

    // Current Supply.
    Counters.Counter private supply;

    // Max Supply.
    uint public maxSupply = 1000;

    // Cost of the NFT mined
    uint public cost = 10 wei;

    // These Object has details about NFT
    struct Object {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;
    }

    // Mapping Owners address with Object (ie :- NFTs)
    // Simply means address is having array inside which owners multiple nfts are inside array and mapped it using address 
    mapping (address=>Object[]) NFTOwners;

    Object[] public objects;

    // Returns object
    function getObjects() public view returns(Object[] memory) {
        return objects;
    }

    // Returns totalSupply
    function totalSupply() public view returns(uint){
        return supply.current();
    } 

    // Function to mint NFTs
    function mint(string memory _object_name, int8 _w, int8 _h, int8 _d, int8 _x, int8 _y, int8 _z) public payable {
         require(supply.current()<=maxSupply,"Supply exceeds maximum");
        require(msg.value >= cost, "Insufficient Payment");
        supply.increment();
        // _safeMint() is the function provided by the ERC721 to mint NFTs.
        _safeMint(msg.sender,supply.current());
        // Creaing Object 
        Object memory _newObject = Object(_object_name,_w,_h,_d,_x,_y,_z);
        objects.push(_newObject);        
        NFTOwners[msg.sender].push(_newObject);
    }

    // function withdraw 
    function withdraw() external payable onlyOwner{
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Means person calling this function will get his/her all NFTs 
    function getOwnerObjects() public view returns(Object[] memory){
        return NFTOwners[msg.sender];
    }    
    
}