import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './styles.css'

const CustomPagination = ({ setState, state }) => {
	const { pagin, minPagin, maxPagin } = state;
	return(
		<div className="appPagination">
			<Pagination aria-label="Page navigation example">
				<PaginationItem disabled={pagin <= minPagin }>
					<PaginationLink first onClick={ () => setState({...state, pagin: minPagin})}/>
				</PaginationItem>

				<PaginationItem disabled={pagin <= minPagin }>
					<PaginationLink onClick={ () => setState({...state, pagin: pagin - 20})}>
						Prev
					</PaginationLink>
				</PaginationItem>

				<PaginationItem disabled={pagin >= maxPagin}>
					<PaginationLink onClick={ () => setState({...state, pagin: pagin + 20})}>
						Next
					</PaginationLink>
				</PaginationItem>

				<PaginationItem disabled={pagin >= maxPagin}>
					<PaginationLink last onClick={ () => setState({...state, pagin: maxPagin})}/>
				</PaginationItem>
			</Pagination>
		</div>
	)
}

export default CustomPagination;
