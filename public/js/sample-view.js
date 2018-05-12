/*
 * 다음 api를 이용해서 div#map에 지도를 넣자
 * ul#block_list의 안의 모든 table에서 가리키는 lng lat을 마커로 표시한다.
 * table 태그를 클릭하면 해당 lng lat 위치로 이동이 된다
 * 가능하면 마커에 마우스를 올리면 정보를 띄워보자
 * html 파일 수정은 최소화 하자(데이터 셋 조정 제외)
 * 본 파일을 수정하면 된다
 */
var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 마커가 표시될 위치입니다 

var lngs = document.getElementsByClassName('block_gps_lng')
var lats =document.getElementsByClassName('block_gps_lat')


var markers = [];
var catchs = document.getElementsByTagName('table')

for(var j = 0 ;j<catchs.length;j++){
    // console.log(j)
    a = catchs[j]
    const lng=a.getElementsByClassName('block_gps_lng')
    const lat=a.getElementsByClassName('block_gps_lat')
    
    a.onclick = (function(lng,lat){
        console.log(lng[0],lat[0])
        mapOption={
            center: new daum.maps.LatLng(lat[0].innerHTML, lng[0].innerHTML), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        map = new daum.maps.Map(mapContainer, mapOption);
        for(var i = 0 ; i<lngs.length;i++){
    
            var iwContent = catchs[i].innerHTML;
            var infowindow = new daum.maps.InfoWindow({
                content : iwContent
            });
            var markerPosition  = new daum.maps.LatLng(lats[i].innerHTML, lngs[i].innerHTML); 
            markers[i] = new daum.maps.Marker({
                position: markerPosition
            });
            markers[i].setMap(map);
            daum.maps.event.addListener(markers[i], 'mouseover', makeOverListener(map, markers[i], infowindow));
            daum.maps.event.addListener(markers[i], 'mouseout', makeOutListener(infowindow));
        }
    }).bind(null, lng,lat)
}

for(var i = 0 ; i<lngs.length;i++){
    
    var iwContent = catchs[i].innerHTML;
    var infowindow = new daum.maps.InfoWindow({
        content : iwContent
    });
    var markerPosition  = new daum.maps.LatLng(lats[i].innerHTML, lngs[i].innerHTML); 
    markers[i] = new daum.maps.Marker({
        position: markerPosition
    });
    markers[i].setMap(map);
    daum.maps.event.addListener(markers[i], 'mouseover', makeOverListener(map, markers[i], infowindow));
    daum.maps.event.addListener(markers[i], 'mouseout', makeOutListener(infowindow));
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}
