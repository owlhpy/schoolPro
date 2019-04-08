import { connect } from "dva";

const IndexPage  = ()=>{
	return(
		<div>
			IndexPage Index
		</div>
		)
}

export default connect(({ index }) => ({ index }))(IndexPage);