//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;


contract EventContract{
 struct Event{
   address organizer;
   string name;
   uint date; //0 1 2
   uint price;
   uint ticketCount;  //1 sec  0.5 sec
   uint ticketRemain;
 }


 mapping(uint=>Event) public events;
 mapping(address=>mapping(uint=>uint)) public tickets;
 uint public nextId;



 function createEvent(string memory name,uint date,uint price,uint ticketCount) external{
   require(date>block.timestamp,"You can organize event for future date");
   require(ticketCount>0,"You can organize event only if you create more than 0 tickets");


   events[nextId] = Event(msg.sender,name,date,price,ticketCount,ticketCount);
   nextId++;
 }


 function buyTicket(uint id,uint quantity) external payable{
   require(events[id].date!=0,"Event does not exist");
   require(events[id].date>block.timestamp,"Event has already occured");
   Event storage _event = events[id];
   require(msg.value==(_event.price*quantity),"Ethere is not enough");
   require(_event.ticketRemain>=quantity,"Not enough tickets");
   _event.ticketRemain-=quantity;
   tickets[msg.sender][id]+=quantity;
}

 function transferTicket(uint id,uint quantity,address to) external{
   require(events[id].date!=0,"Event does not exist");
   require(events[id].date>block.timestamp,"Event has already occured");
   require(tickets[msg.sender][id]>=quantity,"You do not have enough tickets");
   tickets[msg.sender][id]-=quantity;
   tickets[to][id]+=quantity;
}

 function get(uint next ) public view returns (Event memory){
   return events[next];
  }


 function getMember() public view returns (string[] memory, uint[] memory, uint[] memory ,uint[] memory){
      string[]  memory name = new string[](nextId);
      uint[]    memory date = new uint[](nextId);
      uint[]    memory price = new uint[](nextId);
      uint[]    memory ticketCount = new uint[](nextId);

      for (uint i = 0; i < nextId; i++) {
          Event storage member = events[i];
          name[i] = member.name;
          date[i] = member.date;
          price[i] = member.price;
          ticketCount[i] = member.ticketCount;
      }
      return (name , date , price , ticketCount);
  }

  function showTicket(uint eventId, address ticketHolder) public view returns (uint) {
    return tickets[ticketHolder][eventId];
 }

}



