import styled from '@emotion/styled';
import { TextFormatType } from 'common/designType';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';

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

interface ITableItem {
	header: string;
	id?: string;
	element?: React.ReactNode;
	textFormat?: TextFormatType;
}

interface ITable {
	itemSetting: Array<ITableItem>;
	data: Array<any>;
}

const CellBox = styled.td``;

interface ICell {
	row: number;
	col: number;
	text?: string;
	textFormat?: TextFormatType;
	element?: React.ReactNode;
}

function Cell(props: ICell): JSX.Element {
	const { row, col, text, textFormat, element } = props;

	const renderingCell = () => {
		switch (textFormat) {
			case TextFormatType.FORMATTYPE:
				return (
					<CellBox>
						<>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</>
					</CellBox>
				);
			default:
				return <CellBox>{element ? <>{element}</> : <>{text}</>}</CellBox>;
		}
	};

	return <>{renderingCell()}</>;
}

function Table(props: ITable): JSX.Element {
	const { itemSetting, data } = props;

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
											<Cell
												key={colIdx}
												row={rowIdx}
												col={colIdx}
												text={cellItem.id ? rowItem[cellItem.id] : undefined}
												element={cellItem.element}
												textFormat={cellItem.textFormat}
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
