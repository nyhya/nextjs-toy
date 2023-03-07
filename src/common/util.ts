/**
 * @function ConvertPercentegeFloatNumber
 * @param num 원본숫자
 * @param roundNum 반올림 자릿수
 * @description 소수점을 퍼센트지로 변환하여 리턴
 */
export const ConvertPercentegeFloatNumber = (num: number, roundNum: number) => {
	const roundedNum = num.toFixed(roundNum);
	return Number(roundedNum) * 100 + '%';
};
