export default function(state = null, action) {

	switch(action.type) {
		case "BLOG_ARCHIVE_UPDATED":
			return action.payload;
		default: break;
	}

	return(state)
}