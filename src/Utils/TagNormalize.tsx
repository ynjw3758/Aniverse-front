type NomalizeData={
  category_group_code?: string;
  category_group_name?: string;
  category_name?: string;
}

export type PlaceCategory =
  | "travel_spot"
  | "park"
  | "cafe"
  | "restaurant"
  | "animal_hospital"
  | "pet_shop"
  | "grooming"
  | "market"
  | "lodging"
  | "etc";

export const groupCodeTagMap: Record<string, string[]> = {
  MT1: ["장보기", "마트", "쇼핑", "구매", "일상"],
  CS2: ["편의점", "간식", "음료", "휴식", "추천"],
  PS3: ["교육", "어린이", "유치원", "놀이", "일상"],
  SC4: ["학교", "교육", "캠퍼스", "생활"],
  AC5: ["학원", "공부", "교육","자기 개발"],
  PK6: ["주차장", "주차", "외출","드라이브"],
  OL7: ["주유소", "충전소", "차량", "이동","드라이브"],
  SW8: ["지하철역", "대중교통", "이동", "출근"],
  BK9: ["은행", "금융", "거래", "일상"],
  CT1: ["문화시설", "전시", "공연", "체험"],
  AG2: ["중개업소", "부동산", "서비스" , "자취"],
  PO3: ["공공기관", "행정", "서비스" ,"개인 업무"],
  AT4: ["관광명소", "여행", "관광", "풍경"],
  AD5: ["숙박", "호텔", "여행", "휴식"],
  FD6: ["음식점", "식사", "맛집", "추천"],
  CE7: ["카페", "디저트", "휴식", "커피"],
  HP8: ["병원", "진료", "건강"],
  PM9: ["약국", "건강", "케어"],
};


const categoryNameRules: Array<[RegExp, string[]]> = [
  // 🌿 자연 / 산책 / 관광
  [/산|하천|계곡|호수|공원|숲/, ["산책", "자연", "힐링", "풍경", "사진", "주말"]],
  [/여행|관광|명소/, ["여행", "관광", "자연", "풍경", "사진", "드라이브"]],

  // 🛍️ 쇼핑 / 생활
  [/다이소|생활용품|잡화/, ["쇼핑", "구매", "일상", "추천"]],
  [/대형마트|마트|아울렛|할인매장/, ["장보기", "쇼핑", "구매", "일상"]],

  // ☕️ 카페 / 음식
  [/카페|커피|디저트/, ["카페", "디저트", "휴식", "분위기", ]],
  [/음식|식당|맛집|뷔페/, ["맛집", "식사", "메뉴", "후기"]],

  // 🐶 반려동물 (확장 포인트)
  [/동물병원/, ["동물병원", "건강", "진료", "케어"]],
  [/펫샵|애견|반려동물/, ["반려동물", "용품", "간식", "쇼핑"]],
  [/미용/, ["미용", "관리", "케어"]],

  // 🚗 추천 애매 → 컷
  [/교통|수송|도로|교차로|자동차|주유|정비|충전/, ["일상", "기록", "외출"]],
  [/은행|금융/, ["일상", "기록", "외출", "재테크"]],
  [/종교|교회|성당|사찰/, ["일상", "기록", "외출"]],
];

const safe = (data?: string) => (data ?? "").trim(); //넘어온 데이트가 undefined 또는 null이 올 경우 빈배열로 만들기 위한 함수

export function TagNormalizeHnadler(data : NomalizeData) :string[]{
    const result:string[]=[]
     const Code:string = safe(data.category_group_code);
     const Name:string = safe(data.category_name);
     
     if(Code !==""){
        console.log("그룹 코드값 존재 바로 추출");
        if (Code && groupCodeTagMap[Code]) {
            return groupCodeTagMap[Code];
        }

     }else if(Name !== ""){
        console.log("category_name 기반 추출");

        const joined = Name
            .replace(/>/g, " ")
            .replace(/,/g, " ")
            .toLowerCase();

        for (const [re, tags] of categoryNameRules) {
        if (re.test(joined)) {
            return tags;
        }
        }
     }

    return result
}