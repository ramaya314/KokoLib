export default function(state = null, action) {

	switch(action.type) {
		case "NEXT_PAGE_TOKEN_UPDATED":
			return action.payload;
		default: break;
	}

	return(state)
}