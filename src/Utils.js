
import dateFormat from 'dateformat';

import moment from 'moment';

import cheerio from 'cheerio';

class Utils 
{
	static prepareGSArrayForTable(gsArray) {

		if(gsArray.length <= 0)
			return null;

		var tableData = [];

		var columnRow = gsArray[0];

		for(var i = 1; i < gsArray.length; i++) {

			var row = gsArray[i];
			var rowObject = {id : i};

			for (var j = 0; j < row.length; j++) {
				rowObject[columnRow[j]] = row[j]
			}
			if(tableData.indexOf(rowObject) < 0)
				tableData.push(rowObject);
		}
		return tableData
	}

	static getFirstWordOfString(str) {
		if(!str || str.length <= 0 || str.indexOf(" ") < 0)
			return str;

		return str.substr(0, str.indexOf(" "));
	}

	static getBlogArchiveFromBlogData(data) {

		if(!data || data === null)
			return null;

		var items = data.items || data;
		if(!items || items === null || items.length <= 0)
			return null;

		var archive = {};

		for(var i = 0, l = items.length; i < l; i++) {
			var publishedDate = new Date(items[i].published);
			var year = publishedDate.getFullYear();
			var month = dateFormat(publishedDate, "mmmm");

			if(!archive[year])
				archive[year] = {};

			if(!archive[year][month])
				archive[year][month] = {posts: []};

			archive[year][month].posts.push(items[i]);
		}

		return archive;
	}

	static toTitleCase(str)
	{
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}

    static getValidDate(dateString, utc) {
    	if(utc)
	    	return new Date(moment.utc(dateString).valueOf());
	    else 
	    	return new Date(moment(dateString).valueOf());

    }

    static stripHtml(htmlString) {
    	return htmlString.replace(/<[^>]+>/g, '');
    }

    static getFirstImageSourceFromHtml(htmlString) {
		const $ = cheerio.load(htmlString);
		var matches = $('img').attr('src');
    	return matches;
    }
}

export default Utils