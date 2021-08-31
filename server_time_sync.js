// Thanks http://stackoverflow.com/questions/1638337/the-best-way-to-synchronize-client-side-javascript-clock-with-server-date

var serverTimeOffset = false;
function getServerTime(callback) {


        var URL = 'getDate.php';

        var clientTimestamp = Date.parse(new Date().toUTCString());
		
		      $.ajax({
               url : "getDate.php?noCache=" + Date.now(),
			   data: "" ,
               type: "GET",
			   timeout: 10000,
               beforeSend: function(xhr){
				   date_before_send = new Date();
                    console.log('Before send' + date_before_send);
                  },
                  success: function(result) { 
					dateServer = parseInt(result);
					
                    var serverDateStr = new Date(dateServer);
                    var serverTimestamp = Date.parse(new Date(Date.parse(serverDateStr)).toUTCString());

                    var serverClientRequestDiffTime = serverTimestamp - clientTimestamp;
                    var nowTimeStamp  = Date.parse(new Date().toUTCString());

                    var serverClientResponseDiffTime = nowTimeStamp - serverTimestamp;
                    var responseTime = (serverClientRequestDiffTime - nowTimeStamp + clientTimestamp - serverClientResponseDiffTime )/2;

                    serverTimeOffset = (serverClientResponseDiffTime - responseTime);

                    var date = new Date();

                    date.setTime(date.getTime() + serverTimeOffset);
					
					
					
					

                  }
            });
			
			


        
    
}