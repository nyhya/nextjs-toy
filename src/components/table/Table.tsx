import styled from '@emotion/styled';
import { TextFormatType } from 'common/designType';
import dayjs from 'dayjs';
import React, { useEffect, useRef } from 'react';
import { IUser } from 'types/users';

const TableBox = styled.div``;

const TableWrapper = styled.div`
	min-height: calc(700px - 53px);
`;

const StyledTable = styled.table`
	width: 100%;
	border-top: 1px solid #000;
	font-size: 14px;
	color: #202020;
	text-align: center;
	thead tr {
	}
	thead tr th {
		font-size: 13px;
		color: ${props => props.theme['textLight']};
		vertical-align: middle;
		padding: 12px 0px;
	}
	tbody tr {
		cursor: pointer;
	}
	tr {
		border-bottom: 1px solid #dddddd;
	}

	td {
		padding: 9px 0;
	}
	td.title-cell {
		text-align: left;
	}
	.state-cell {
		width: 50px;
	}
	.name-cell {
		width: 250px;
	}
	.purpose-cell {
		width: 300px;
	}
	.normal-cell {
		width: 150px;
	}
`;

const CellBox = styled.td``;

export interface IGridPosition {
	col: number;
	row: number;
}

export interface IGrideCell<T> {
	position: IGridPosition;
	data: T;
	change: (position: IGridPosition, value?: T) => void;
}

interface ICell<T> {
	row: number;
	col: number;
	text?: string;
	textFormat?: TextFormatType;
	element?: React.FC<IGrideCell<T>>;
	rowData: T;
	onChangeValue: (position: IGridPosition, value?: any) => void;
}

function Cell<T>(props: ICell<T>): JSX.Element {
	const { row, col, text, textFormat, rowData, element, onChangeValue } = props;
	const Component = element;

	const renderingCell = () => {
		switch (textFormat) {
			case TextFormatType.FORMATTYPE:
				return (
					<CellBox>
						<>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</>
					</CellBox>
				);
			default:
				return (
					<CellBox>
						{Component ? (
							<>
								{
									<Component
										data={rowData}
										position={{ col: col, row: row }}
										change={onChangeValue}
									></Component>
								}
							</>
						) : (
							<>{text}</>
						)}
					</CellBox>
				);
		}
	};

	return <>{renderingCell()}</>;
}

interface ITableItem {
	header: string;
	id?: string;
	element?: React.FC<IGrideCell<any>>;
	textFormat?: TextFormatType;
}

interface ITable<T> {
	itemSetting: Array<ITableItem>;
	data: Array<T>;
}

function Table<T>(props: ITable<T>): JSX.Element {
	const { itemSetting, data } = props;

	const onChangeTableCellValue = (position: IGridPosition, value?: any) => {
		console.log(position, value);
	};
	return (
		<TableBox>
			<TableWrapper>
				<StyledTable>
					<thead>
						<tr>
							{itemSetting.map((item, idx) => {
								return (
									<th className="state-cell" key={idx}>
										{item.header}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{data.map((rowItem, rowIdx) => {
							return (
								<tr key={rowIdx}>
									{itemSetting.map((cellItem, colIdx) => {
										return (
											<Cell<T>
												key={colIdx}
												row={rowIdx}
												col={colIdx}
												rowData={rowItem}
												text={cellItem.id && rowItem[cellItem.id]}
												element={cellItem.element}
												textFormat={cellItem.textFormat}
												onChangeValue={onChangeTableCellValue}
											/>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</StyledTable>
			</TableWrapper>
		</TableBox>
	);
}

export default Table;
