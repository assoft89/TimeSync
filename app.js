var varsLS = {
	corr_ms : function (corr_ms){
		
		if (typeof corr_ms  === 'undefined' ){	
			if (typeof localStorage.corr_ms === 'undefined')
				return localStorage.corr_ms = 50;
			else
				return localStorage.corr_ms;
		}
		else
			return localStorage.corr_ms = $(ms).val();
		},
		offset : function(offset){
			var res;
			if (isNaN(offset))
				offset = 0;
				
			if (typeof offset  === 'undefined' ){	
				if (typeof localStorage.offset === 'undefined' || isNaN(offset))
					res =  localStorage.offset = 0 ;
				else
					res =  localStorage.offset;
			}
			else{
				res =  localStorage.offset = offset;
			}
			$(div_offset).text('offset: ' + res);
			return res;
		}
}

function ready(){
	$('.btEditTime').hide();	
}

function plus(){
	
	var div_ms = parseInt($(ms).val());
	if (isNaN(div_ms))
		$(ms).val(50);
		
	

	ntp_c.offset = ntp_c.offset + parseInt($(ms).val());
	varsLS.offset(ntp_c.offset);
}
function minus(){
	var div_ms = parseInt($(ms).val());
	if (isNaN(div_ms))
		$(ms).val(50);
		
	ntp_c.offset = ntp_c.offset -  parseInt($(ms).val());
	varsLS.offset(ntp_c.offset);
}


var tPing,
	tServ;

	
var ntp_corrected = false;

var ntp_c;

function ntp(t0, t1, t2, t3) {
    return {
        roundtripdelay: (t3 - t0) - (t2 - t1),
        offset: ((t1 - t0) + (t2 - t3)) / 2
    };
}

function local(){
tPing = (new Date).getTime(); 
  tServ = (new Date).getTime();
  
  var t1 = tServ,
	t2 = tServ,
	t3 = (new Date()).valueOf();
	ntp_c = ntp(tPing, t1, t2, t3);
	
	varsLS.corr_ms($(ms).val());
	ntp_c.offset = parseInt(varsLS.offset());
	
	console.log("Local = NTP delay:", ntp_c.roundtripdelay, "NTP offset:", ntp_c.offset, "corrected: ", (new Date(t3 + ntp_c.offset))); 
	ntp_corrected = true;		


}

function onchange_ms(){
	varsLS.corr_ms($(ms).val());
}

function test2(){
tPing = (new Date).getTime(); 
	
	  $.ajax({
	   type: 'GET',
	   url:'',
	   data: {"noCache":(new Date).getTime()},
	   success: function(data, textStatus, request){
	   
					  tServ = (new Date(request.getResponseHeader('Date'))).getTime();
					  
					  var t1 = tServ,
						t2 = tServ,
						t3 = (new Date()).valueOf();
						ntp_c = ntp(tPing, t1, t2, t3);
						
						console.log("NTP delay:", ntp_c.roundtripdelay, "NTP offset:", ntp_c.offset, "corrected: ", (new Date(t3 + ntp_c.offset))); 
						ntp_corrected = true;
						
	  
	   },
	   error: function (request, textStatus, errorThrown) {
			
	   }
	  });
  
}

function test(){

tPing = (new Date).getTime(); 

      $.ajax({
               url : "getDate.php",
			   data: "" ,
               type: "GET",
			   timeout: 10000,
               beforeSend: function(xhr){
				  
                  },
                  success: function(result) { 
				  tServ = parseInt(result);
				  
				  var t1 = tServ,
					t2 = tServ,
					t3 = (new Date()).valueOf();
					ntp_c = ntp(tPing, t1, t2, t3);
					
					console.log("NTP delay:", ntp_c.roundtripdelay, "NTP offset:", ntp_c.offset, "corrected: ", (new Date(t3 + ntp_c.offset))); 
					ntp_corrected = true;
                  }
            });
}



function showTime(){
	
	if (ntp_corrected){
		var dt = (new Date).getTime() + ntp_c.offset;
		var sec = moment(dt).format("ss");
		if (cnt1.innerHTML !=  sec)
			cnt1.innerHTML = sec;
	}else
		if (cnt1.innerHTML != '0')
			cnt1.innerHTML = '0';
	
}



	





