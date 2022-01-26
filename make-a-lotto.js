/**
 * make a lotto . js 
 * park kyung min - 2021
 */

//게임 번호
var count = 0;

//고정번호
var myNum_arr = [];

//제외번호
var notNum_arr = [];

//고정번호 갯수
var chk;

$(document).ready(function(){
	console.log('OPYRIGHT © 2021 Park Kyung Min. ALL RIGHT RESERVED');
	//고정숫자
	$("input[name='cb']").on("click", function() {
		chk = $("input:checked[name='cb']").length;
		
		if(chk > 5){
			$(this).prop("checked",false);
			alert('5개까지만 선택 가능!');
		}
		
	})
	
	//제외숫자
	$("input[name='nb']").on("click", function() {
		chk = $("input:checked[name='nb']").length;
		
 		if(chk > 20){
			$(this).prop("checked",false);
			alert('20개까지만 선택 가능!');
		}
	})
	
	//check box show
	$('input[type="checkbox"]').show();
	
	//복사할 텍스트 hide
	$('#copyzone').hide();
})

/* 고정번호 선택 popup */
function fn_myNum() {
 	myNum_arr = [];
 	
 	/* 제외번호 선택한게 있으면 checkbox disabled */
	var cbLength = $('input[name="cb"]').length;
	var notarrylength = notNum_arr.length;

	if(notarrylength != 0){
		for (var i = 1; i <= cbLength; i++) {
			
			for (var j = 0; j < notarrylength; j++) {
				if($('#cb'+i).val() == notNum_arr[j]){
					$('#cb'+i).prop("disabled","disabled");
				}
			}	
		}
	}else{
		$('input[name="cb"]').removeAttr("disabled");
	}
 	
 	
	$('#myNumPop').show();
}

/* 고정번호 취소 */
function fn_cancel() {
	$("input[name='cb']").prop("checked",false);
	myNum_arr = [];
	
	var html = '';
	
	$('#myNumDiv').html(html);
	$('#myNumPop').hide();
}

/* 고정번호 선택 */
function fn_ok(){
	
	var check_cb = $("input[name='cb']").is(":checked");
	
	if(!check_cb){
		fn_cancel();
		return false;
	}
	
	$("input:checked[name='cb']").each(function() {
		var val = $(this).val();
		myNum_arr.push(val);
	})
	
	myNum_arr.sort(function(a, b) {
		return a - b;
	});
	
	var html = '<br><h1><i class="fas fa-check-circle"></i>   ' + myNum_arr + '</h1>';
	
	$('#myNumDiv').html(html);
	
	$('#myNumPop').hide();
}


/* 제외번호 선택 popup */
function fn_notNum() {
	notNum_arr = [];
	
	/* 고정번호 선택한게 있으면 checkbox disabled */
	var nbLength = $('input[name="nb"]').length;
	var myarrylength = myNum_arr.length;
	
	if(myarrylength != 0){
		for (var i = 1; i <= nbLength; i++) {
			
			for (var j = 0; j < myarrylength; j++) {
				if($('#nb'+i).val() == myNum_arr[j]){
					$('#nb'+i).prop("disabled","disabled");
				}
			}	
		}
	}else{
		$('input[name="nb"]').removeAttr("disabled");
	}
	 
	$('#notNumPop').show();
}

/* 제외번호 취소 */
function fn_notNum_cancel() {
	$("input[name='nb']").prop("checked",false);
	notNum_arr = [];
	
	var html = '';
	
	$('#notNumDiv').html(html);
	$('#notNumPop').hide();
}

/* 제외번호 선택 */
function fn_notNum_ok(){
	
	$("input:checked[name='nb']").each(function() {
		// disabled 아닌 것만 push	
		if($(this).attr('disabled') != 'disabled'){
			var val = $(this).val();
			notNum_arr.push(val);
		}
	})
	
	notNum_arr.sort(function(a, b) {
		return a - b;
	});
	
	if(notNum_arr.length == 0){
		 fn_notNum_cancel();
		return false;
	}
	
	var html = '<br><h1><i class="fas fa-times-circle"></i>   ' + notNum_arr + '</h1>';
	
	$('#notNumDiv').html(html);
	
	$('#notNumPop').hide();
}

/* 로또 번호 돌리기 */
function fn_game() {
	
	var comment = [
		'다시하세요 😫',
		'다시...🤦🏻‍♂️',
		'이건 안될것같아요..🤦🏻‍♀️',
		'🤦🏻‍♂️🤦🏻‍♀️🤦🏼‍♂️🤦🏼‍♀️🤦🏾‍♀️🤦🏾‍♂️',
		'🤦🏻‍♂️🤦🏻‍♀️🤦🏼‍♂️🤦🏼‍♀️🤦🏾‍♀️🤦🏾‍♂️',
		'🥇 1등 각이다 🥇',
		'다시..🤦‍♂️',
		'다시 눌러봅시다!!👏🏻',
		'다시 돌립시다...🤦🏼‍♂️',
		'실패!!🧨🧨🧨',
		'☠☠☠☠☠☠',
		'.....💬',
		'💰💰💰💰이거다!!💰💰💰💰',
		'2등정도..?🥈',
		'이건 안되겠다🤬🤬',
		'실패!!🧨🧨🧨',
		'다시하세요 😫',
		'❌❌❌❌❌❌❌❌',
		'다른번호..😨😨😨',
		'안될거같아💦💦',
		'.....💬',
		'💀💀다시💀💀',
		'💸💸💸이거다💸💸💸',
		'꽝💣💣',
		'다시하세요 😫',
		'🤑돈들어 오는게 보인다🤑',
		'💰당💰첨💰된💰다💰',
		'꽝💣💣',
		'제발..다시..🙏🏻',
		'❌❌❌❌❌❌❌❌',
		'🤦🏻‍♂️🤦🏻‍♀️🤦🏼‍♂️🤦🏼‍♀️🤦🏾‍♀️🤦🏾‍♂️',
		'.....💬',
		'💣💣꽝💣💣',
		'이 번호로 가자! 💴💵💶',
		'💀💀다시💀💀',
		'........👎🏽',
		'느낌이 좋아요 🤩🤩',
		'🥇🏆👑💎💍💰💴💵💶💸💳🏧',
		'이건안된다..😭😰',
		'다른번호..😨😨😨',
		'🥇🥇🥇🥇🥇🥇🥇🥇🥇🥇'
		]; // 36개
	
	var c_num = Math.floor(Math.random() * 40);
	$('#ment').text(comment[c_num]);
	
	
	var numbers = [];
	
	if(myNum_arr.length == 0 && notNum_arr.length == 0){ //고정번호나 제외번호가 없으면 고냥
		for (i = 1; i <= 6; i++) {
			var num = Math.floor(Math.random() * 45) + 1; // 1~45 까지
			if (numbers.indexOf(num) === -1) {			// 앞에랑 중복값 제거
				numbers.push(num);
			} else {
				i--;
			}
		}
		numbers.length = 6;
		
		numbers.sort(function(a, b) {
			return a - b;
		});
		
	} else if(myNum_arr.length != 0 && notNum_arr.length != 0){ // 고정 + 제외 번호
		//로또 1~ 45생성, 고정번호 배열에 넣고, 1~45에서 고정번호+제외번호 제거 하고 랜덤
		
		var lottoNum = [];
		for (var i = 0; i < 45; i++) {
			lottoNum[i] = i + 1 ;
		}
		
		var index;
		var a_num;
		
		// 생성번호 배열에서 고정번호 제거, 로또번호에 고정번호 push
 		for (var i = 0; i < myNum_arr.length; i++) {
			
 			a_num = myNum_arr[i];
			
			index = lottoNum.indexOf(a_num-1+1);
			
			if(index > -1){
				lottoNum.splice(index, 1);
			}
			
			numbers.push(a_num);
		}
		
		var index2;
		var b_num;
		
		//제외번호 제거
 		for (var i = 0; i < notNum_arr.length; i++) {
			
 			b_num = notNum_arr[i];
			
			index2 = lottoNum.indexOf(b_num-1+1);
			
			if(index2 > -1){
				lottoNum.splice(index2, 1);
			}
		}
		
 		var notNumLeng = notNum_arr.length;
		var myNumLeng = myNum_arr.length;
		var leng = notNumLeng + myNumLeng;
		
		// 랜덤값 push, 고정번호 갯수만큼 생성번호에서 빠졌으니 배열크기 45 - 고정번호 길이(= 갯수)
		for (i = myNumLeng; i < 6; i++) {
			
			var num = Math.floor(Math.random() * (45 - leng));
			
			var num2 = lottoNum[num];
			
			if (numbers.indexOf(num2) === -1) {
				numbers.push(num2);
			} else {
				i--;
			}
		}
		
		numbers.sort(function(a, b) {
			return a - b;
		});
		
	} else if(myNum_arr.length != 0) { //고정번호가 있으면
		// 번호생성 (1~45)
		var lottoNum = [];
		for (var i = 0; i < 45; i++) {
			lottoNum[i] = i + 1 ;
		}	
		
		var index;
		var a_num;
		
		// 생성번호 배열에서 고정번호 제거, 로또번호에 고정번호 push
 		for (var i = 0; i < myNum_arr.length; i++) {
			
 			a_num = myNum_arr[i];
			
			index = lottoNum.indexOf(a_num-1+1);
			
			if(index > -1){
				lottoNum.splice(index, 1);
			}
			
			numbers.push(a_num);
		}

		
		
		var myNumLeng = myNum_arr.length;
		
		// 랜덤값 push, 고정번호 갯수만큼 생성번호에서 빠졌으니 배열크기 45 - 고정번호 길이(= 갯수)
		for (i = myNumLeng; i < 6; i++) {
			
			var num = Math.floor(Math.random() * (45 - myNumLeng));
			
			var num2 = lottoNum[num];
			
			if (numbers.indexOf(num2) === -1) {
				numbers.push(num2);
			} else {
				i--;
			}
		}
		
		//sort 오름차순
		numbers.sort(function(a, b) {
			return a - b;
		});
		
	} else if(notNum_arr.length != 0){ //제외번호가 있으면
		// 번호 생성 배열 1~45
		var lottoNum = [];
		for (var i = 0; i < 45; i++) {
			lottoNum[i] = i + 1 ;
		}
		
		var index;
		var a_num;
		
		//제외번호 제거
 		for (var i = 0; i < notNum_arr.length; i++) {
			
 			a_num = notNum_arr[i];
			
			index = lottoNum.indexOf(a_num-1+1);
			
			if(index > -1){
				lottoNum.splice(index, 1);
			}
		}
 		
		var notNumLeng = notNum_arr.length;
		
		// 랜덤값 push, 고정번호 갯수만큼 생성번호에서 빠졌으니 배열크기 45 - 고정번호 길이(= 갯수)
		for (i = 0; i < 6; i++) {
			
			var num = Math.floor(Math.random() * (45 - notNumLeng));
			
			var num2 = lottoNum[num];
			
			if (numbers.indexOf(num2) === -1) {
				numbers.push(num2);
			} else {
				i--;
			}
		}
 		
		numbers.sort(function(a, b) {
			return a - b;
		});
		
	}

	// 게임 번호 onclick 시 증가
	count += 1;
	var games;
	
	if(count == 1){
		games = 'A';
	}
	if(count == 2){
		games = 'B';
	}
	if(count == 3){
		games = 'C';
	}
	if(count == 4){
		games = 'D';
	}
	if(count == 5){
		games = 'E';
	}
	
	// 로또 번호 테이블
	var trtd = '<tr style="text-align: center;">';
	trtd += '<td><h2>' + games + '</h2></td>';
	trtd += '<td style="text-align: center;">';

	for (var i = 0; i < numbers.length; i++) {

		var lotto_num = numbers[i];
		var cnt = i + 1;

		trtd += '<div class="lotto_mball" id="mball_'+ count + cnt + '">'
				+ numbers[i] + '</div>';
	}

	trtd += '</td>';
	trtd += '</tr>';
	
	
	//선택번호 확인 팝업 테이블
	var trtd2 = '<tr>';
	trtd2 += '<td><h1>' + games + '</h1></td>';
	trtd2 += '<td colspan="3"><h1>'
	for (var i = 0; i < numbers.length; i++) {

		var lotto_num = numbers[i];
		var cnt = i + 1;

	trtd2 += numbers[i] + '&ensp; ';

	}
	trtd2 += '</h1></td>'
	trtd2 += '</tr>';
	
	//복사할 번호 text
	var copytext = '';
	copytext += '' + games + ' : ';
	for (var i = 0; i < numbers.length; i++) {

		var lotto_num = numbers[i];
		var cnt = i + 1;
		
		if(i != 5){
			copytext += numbers[i] + ', ';
		}else{
			copytext += numbers[i];
			copytext += '\n';
		}

	}
	
	
	
	$('#copytext').append(copytext);
	$('#tableBody').append(trtd);
	$('#tableBody2').append(trtd2);

	for (var i = 0; i < numbers.length; i++) {

		var lotto_num = numbers[i];
		var cnt = i + 1;

		if (lotto_num < 10) {
			$('#mball_' + count + cnt + '').css('background-color',
					'rgb(251, 196, 0)');
		} else if (lotto_num < 20) {
			$('#mball_' + count + cnt + '').css('background-color',
					'rgb(105, 200, 242)');
		} else if (lotto_num < 30) {
			$('#mball_' + count + cnt + '').css('background-color',
					'rgb(255, 114, 114)');
		} else if (lotto_num < 40) {
			$('#mball_' + count + cnt + '').css('background-color',
					'rgb(170, 170, 170)');
		} else if (lotto_num <= 45) {
			$('#mball_' + count + cnt + '').css('background-color',
					'rgb(179, 225, 52)');
		}

	}
}

/* 클릭시 game 수에 따라  fn_game 돌아감 */
function fn_lotto() {
	
	count = 0;
	
	var selectBtn = '<div id="selectDiv" style="width: 100%; text-align: center;">';
		selectBtn += '<button id="selectBtn" type="button" class="btn" style="width: 330px; height: 70px; font-size: 23px; font-weight: bold; margin-top: 30px;" onclick="fn_select();">지금 번호 선택</button>';
		selectBtn += '</div>';
	
	$("#tableBody").html('');
	$("#tableBody2").html('');
	$('#copytext').html('');
	
	$('#selectDiv').remove();
	
	$('#tableDIV').append(selectBtn);
	
	var game = $('#select_gm').val();

	for (var i = 1; i <= game; i++) {
		fn_game();
	}
	
}

/* 게임 수 바꾸면 테이블 초기화 */
function fn_change() {
	count = 0;
	var html = '<tr style="text-align: center;">';
	html += '<td colspan="2" style="font-weight: bold; font-size: 25px;">번호 생성 하기 버튼을 눌러주세요!!</td>';
	html += '</tr>';

	$("#tableBody").html(html);
	$('#copytext').html('');
	
	$('#selectDiv').remove();
	
}

/* 지금 번호 선택 */
function fn_select() {
	
	var now = new Date();
	var nowDayOfWeek = now.getDay();
	var nowDay = now.getDate();
	var nowMonth = now.getMonth()+1;
	var nowYear = now.getYear();
	
	var thisWeekSaturday = now.getFullYear()+ "/" +nowMonth + "/" + (nowDay + (6 - nowDayOfWeek)); 
	var lastday = (now.getFullYear()+1)+ "/" +nowMonth + "/" + (nowDay + (6 - nowDayOfWeek) + 1); 
	var today = now.getFullYear() + "/" +nowMonth + "/" + nowDay;
	
	$('#todayP').text("발 행 일 : " + today);
	$('#lottery').text("추 첨 일 : " + thisWeekSaturday);
	$('#lastDay').text("지급기한 : " + lastday);
	
	
	var gm= $("#select_gm").val();
	
	$('#howMuch').text('합계 : ' + gm + ',000 원');
	
	$('#selectLotto').show();
}

/* 번호 확인 닫기*/
function fn_close() {
	 $('#selectLotto').hide();
}

/*번호 복사*/
function copyNumber() {
	var text = $('#copytext').html();
	
	var result = text.slice(0, -1);
	
	var area = document.createElement("textarea");
	
	document.body.appendChild(area);
	
	area.value= result;
	area.select();
	
	document.execCommand("copy");
	
	document.body.removeChild(area);

	alert('클립보드에 복사되었습니다.');
}

/* 인쇄*/
function printDiv()	{
	  var divToPrint=document.getElementById('print');
	  var newWin=window.open('','Print-Window');
	  newWin.document.open();
	  newWin.document.write('<html><body onload="window.print()" style="width:800px;">'+divToPrint.innerHTML+'</body></html>');
	  newWin.document.close();
	  setTimeout(function(){newWin.close();},10);
}