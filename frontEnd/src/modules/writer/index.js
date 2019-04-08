import { connect } from "dva";
const Writer  = ()=>{
	return(
		<div>
			Writer Index
		</div>
		)
}

export default connect(({ writer }) => ({ writer }))(Writer);