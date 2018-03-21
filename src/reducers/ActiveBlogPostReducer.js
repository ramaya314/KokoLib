export default function(state = null, action) {

	switch(action.type) {
		case "BLOG_POST_SELECTED":
			return action.payload;
		default: break;
	}

	return(state)
}