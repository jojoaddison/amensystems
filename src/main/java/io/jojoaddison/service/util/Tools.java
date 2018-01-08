package io.jojoaddison.service.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public final class Tools {

	private static Logger logger = LoggerFactory.getLogger(Tools.class);


	public static String toUppercaseFirst(String word){		;
		return String.valueOf(word.charAt(0)).toUpperCase().concat(word.substring(1));
	}

	public static String toJSON(String jsonTag){
		return "{ " + jsonTag  + "}";
	}


	public static String toJsonList(String jsonList){
		return "[ " + jsonList  + "]";
	}

	public static String toJSON(final String attr, final int value) {
		return "{ " + jsonTag(attr, value)  + "}";
	}

	public static String toJSON(final String attr, final String value) {
		return "{ " + jsonTag(attr, value) + " }";
	}

	public static String toJSON(final String attr, final String value, boolean array) {
		return "{ \"" + jsonTag(attr, value, array) + "}";
	}


	public static String jsonTag(final String attr, final int value) {
		return "\"" + attr + "\" : " + value ;
	}

	public static String jsonTag(final String attr, final String value){
		return "\"" + attr + "\" : \"" + value + "\"";
	}

	public static String jsonTag(final String attr, final String value, boolean array) {
		String tag = (array == true?"":"\"");
		return "\"" + attr + "\" :" + tag + value +  tag ;
	}

	public static String XMLtoJSON(final String strXML) {
		return XMLtoJSON(strXML, 0);
	}

	public static String XMLtoJSON(final String strXML, final int JSONindent) {
		String strJSON = null;

		JSONObject xmlJSONObj;
		try {
			xmlJSONObj = XML.toJSONObject(strXML);
			strJSON = xmlJSONObj.toString(JSONindent);
		}
		catch (final JSONException e) {
			e.printStackTrace();
		}

		return strJSON;
	}

	public static String mapToJson(Map<String, Object> options){

		ObjectMapper objectMapper = new ObjectMapper();
		String json="";

		try {
			json = objectMapper.writeValueAsString(options);
		} catch (JsonProcessingException e) {
			logger.error(e.getMessage(), e.getCause());
		}

		return json;

	}

	public static ArrayList<String> parseDirectoryByFilter(String path, String filter){
		ArrayList<String> directoryNameList = new ArrayList<String>();

		if(path == null || filter == null){
			return directoryNameList;
		}

		File directory = new File(path);
		if(directory.exists()){
			if(directory.isDirectory()){
				File [] fileList = directory.listFiles();
				for(File f: fileList){
					if(f.isDirectory() && f.getName().trim().length() > 0){
						File filterFile = new File(f.getPath() + filter);
						if(filterFile.exists()){
							directoryNameList.add("\""+f.getName()+"\"");
						}
					}
				}
			}
		}

		return directoryNameList;
	}


	public static String toJsonArray(String list){
		String separator = ",";
		String jsonArray = "[";
		String listArray[] = new String[] {""};

		if((list.indexOf(separator) > 0)){
			listArray = list.split(separator);
			for(String s: listArray){
				String sep = (jsonArray != "["?",":"");
				jsonArray = jsonArray + sep + "\"" + s + "\"";
			}
			jsonArray = jsonArray + "]";
		}

		return jsonArray;
	}


	/**
	 * This creates and returns a time stamp with the format yyyyMMddHHmmss
	 *
	 * @return date stamp 20140131140134
	 */
	public static String getDate() {
		java.util.Date today = new java.util.Date();
		final SimpleDateFormat spc = new SimpleDateFormat("yyyyMMddHHmmss");
		final String date = spc.format(today);
		return date;
	}


	/**
	 * This creates and returns current date with the given format.
	 * Defaults to yyyyMMddHHmmss if no date format or a wrong date format is provided.
	 * @return date
	 */
	public static String getDate(String dateFormat) {
		String date = "";
		if(dateFormat == null){
			dateFormat = "yyyyMMddHHmmss";
		}
		java.util.Date today = new java.util.Date();
		try{
			final SimpleDateFormat spc = new SimpleDateFormat(dateFormat);
			date = spc.format(today);
		}catch(Exception e){
			return Tools.getDate();
		}
		return date;
	}

	public static Date getDateTimeFromString(String dateString, String dateFormat){

		if(dateFormat == null){
			dateFormat = "yyyyMMddHHmmss";
		}

		java.util.Date today = new java.util.Date();

		try{
			final SimpleDateFormat spc = new SimpleDateFormat(dateFormat);
			today = spc.parse(dateString);
		}catch(Exception e){
			return new java.util.Date();
		}

		return today;
	}

public static ArrayList<String> parseFilePaths(String xmlFilePath, String filter) throws XPathExpressionException, ParserConfigurationException, SAXException, IOException {
	ArrayList<String> attributes = new ArrayList<String>();

	DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
	domFactory.setNamespaceAware(true);
	DocumentBuilder builder = domFactory.newDocumentBuilder();

	File basePath = new File(xmlFilePath);

	logger.info("basePath: " + basePath);
	logger.info("xmlFilePath: " + xmlFilePath);

	Document doc = builder.parse(basePath);

		XPath xPath = XPathFactory.newInstance().newXPath();
		XPathExpression file 	= xPath.compile(filter);
		NodeList attributeNodes = (NodeList) file.evaluate(doc, XPathConstants.NODESET);

		logger.info("attributeNodes length: " + attributeNodes.getLength());

		for(int i=0; i < attributeNodes.getLength(); i++){
			final String nodePath = basePath.getParent() +  attributeNodes.item(i).getNodeValue();
			logger.info("nodePath: " + nodePath);
			attributes.add(nodePath);
		}
		return attributes;
	}

	public static ArrayList<String> parseBackupFolder(String rootPath){

		ArrayList<String> folderList = new ArrayList<String>();

		if(rootPath == null || rootPath.trim().length()==0){
			return folderList;
		}

		File backupDirectory = new File(rootPath);

		if(!backupDirectory.exists()){
			return folderList;
		}


		for(File t: backupDirectory.listFiles()){

			String path =  "{" + jsonTag("timestamp", t.getName());

			for(File m: t.listFiles()){

				String mpath = path + "," + jsonTag( "model", m.getName());

				for(File s: m.listFiles()){

					if(s.isFile()){
						mpath = mpath + "," + jsonTag("modelFile", s.getName());
					}

					if(s.isDirectory()){

						String fpath = "[";

						for(File f: s.listFiles()){
							String sep = (fpath != "["?",":"");
							fpath = fpath + sep + "\"" + f.getName() + "\"";
						}

						fpath = fpath + "]";
						String spath = mpath + "," + jsonTag("extractors", fpath, true)  + "}";
						folderList.add(spath);
					}

				}
			}
		}

		return folderList;
	}


	public static String appendToJSON(String original, String next){

		int pos = original.length()-1;

		String lastChar = String.valueOf(original.charAt(pos));

		StringBuilder finished = new StringBuilder();

		finished.append(original.substring(0, pos));
		finished.append(",");
		finished.append(next);
		finished.append(lastChar);

		return finished.toString();
	}



/**
 * Parse backup folder and return paths for passed timestamp and model name
 * @param rootPath
 * @param timestamp
 * @param model
 * @return json formated timestamp and model object.
 */
	public static ArrayList<String> parseBackupFolder(String rootPath, String timestamp, String model){

		ArrayList<String> folderList = new ArrayList<String>();

		if(rootPath == null || rootPath.trim().length()==0){
			return folderList;
		}

		File backupDirectory = new File(rootPath);

		if(!backupDirectory.exists()){
			return folderList;
		}


		for(File t: backupDirectory.listFiles()){

			if(t.getName().equals(timestamp)){ // Filter timestamp

				String path =  "{" + jsonTag("timestamp", t.getName());

				for(File m: t.listFiles()){

					if(m.getName().equals(model)){ // Filter model name

						String mpath = path + "," + jsonTag( "model", m.getName());

						for(File s: m.listFiles()){

							if(s.isFile()){
								mpath = mpath + "," + jsonTag("modelFile", s.getPath());
							}

							if(s.isDirectory()){

								String fpath = "[";

								for(File f: s.listFiles()){
									String sep = (fpath != "["?",":"");
									fpath = fpath + sep + "\"" + f.getPath() + "\"";
								}

								fpath = fpath + "]";
								mpath = mpath + "," + jsonTag("extractors", fpath, true)  + "}";
								folderList.add(mpath);

							}
						}
					}
				}
			}
		}

		return folderList;
	}


	public static boolean modelExist(String rootPath, String modelName){
		if(rootPath == null || rootPath.trim().length()==0){
			return false;
		}
		if(modelName == null || modelName.trim().length()==0){
			return false;
		}

		File backupDirectory = new File(rootPath);

		if(backupDirectory == null || !backupDirectory.exists()){
			return false;
		}

		for(File t: backupDirectory.listFiles()){

			if(t.getName().equals(modelName)){
				return true;
			}
		}

		return false;
	}



/**
 * Get restore folder and return paths for passed timestamp and model name parameters
 * @param rootPath
 * @param timestamp
 * @param model
 * @return json formated timestamp and model object.
 */
	public static ArrayList<String> getRestoreFolderList(String rootPath, String timestamp, String model){

		ArrayList<String> folderList = new ArrayList<String>();

		if(rootPath == null || rootPath.trim().length()==0){
			return folderList;
		}

		if(timestamp == null || timestamp.length() == 0){
			return folderList;
		}

		if(model == null || model.length() == 0){
			return folderList;
		}

		File backupDirectory = new File(rootPath);

		if(!backupDirectory.exists()){
			return folderList;
		}


		for(File t: backupDirectory.listFiles()){

			if(t.getName().equals(timestamp)){ // Filter timestamp

				String path =  "timestamp:" + t.getPath();
				folderList.add(path);

				for(File m: t.listFiles()){

					if(m.getName().equals(model)){ // Filter model name

						String mpath = "model:" + m.getName();
						folderList.add(mpath);

						for(File s: m.listFiles()){

							if(s.isFile()){
								mpath = "modelFile:" + s.getPath();
								folderList.add(mpath);
							}

							if(s.isDirectory()){

								for(File f: s.listFiles()){
									String fpath = "extractor:" + f.getPath();
									folderList.add(fpath);
								}

							}
						}
					}
				}
			}
		}

		return folderList;
	}

	public static String convertDocumentToString(Document doc) {
		StringWriter writer = new StringWriter();
		try {
			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer transformer;
			transformer = tf.newTransformer();
			transformer.transform(new DOMSource(doc), new StreamResult(writer));
		} catch (TransformerException e) {
			logger.error(e.getMessage(), e.getCause());
		}
		String output = writer.getBuffer().toString();
		return output;
	}

	public static void logMessage(Level level, final String msg) {
//		logger.log(level, msg);
	}


	public static String printJSON(Object o){
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
		String json = null;
		try {
			json = objectMapper.writeValueAsString(o);
			if(json != null){
				return json.trim();
			}
		} catch (JsonProcessingException e) {
			logger.error(e.getMessage(), e.getCause());
			e.printStackTrace();
		}
		return json;
	}

	public static Date getTimeFromString(String time) throws ParseException{
		if(time == null || time.trim().length() == 0) time = "23:59";
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
		return formatter.parse(time);
	}

	public static String getStringFromDate(Date date, String dateFormat) {
		String theDate = "";
		if(date == null){
			date =  new java.util.Date();
		}
		if(dateFormat == null){
			dateFormat = "yyyyMMddHHmmss";
		}
		try{
			final SimpleDateFormat spc = new SimpleDateFormat(dateFormat);
			theDate = spc.format(date);
		}catch(Exception e){
			return Tools.getDate();
		}
		return theDate;

	}

	public static String removeSpaces(String word){
		if(StringUtils.isNotEmpty(word))
				 {
					word = word.replaceAll("\\s+", "");
				}
		return word;
	}

	public static <S extends Object> S getObject(String data, Class<S> classType){
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
		S sobject = null;
		try {
			sobject = mapper.readValue(data.getBytes(), classType);
			return sobject;
		} catch (IOException e) {
			logger.error(e.getMessage(), e.getCause());
		}
		return sobject;
	}

	public static String getSeparator() {
		return System.getProperty("file.separator");
	}

	public static String getYear() {
		return Tools.getDate("yyyy");
	}

	public static String getMonth() {
		return Tools.getDate("MM");
	}

	public static String getDay() {
		return Tools.getDate("dd");
	}

	public static String getHour() {
		return Tools.getDate("HH");
	}

	public static String createDirectory(String fullPath) throws IOException {
		File path = new File(fullPath);

		if(path.exists() && path.isDirectory()){
			return path.getAbsolutePath();
		}

		if(!path.exists() && path.mkdirs()){
			if(path.exists() && path.isDirectory()){
				Tools.setPermission(path.getAbsolutePath(), Tools.getPermissions775());
				return path.getAbsolutePath();
			}
		}

		return null;

	}

	public static boolean removeFile(String filePath) {
		File file = new File(filePath);
		if(file.exists() && file.isFile()){
			return file.delete();
		}
		return false;
	}

	public static void createFile(String fileName, byte[] fileContent) throws IOException {
		BufferedOutputStream stream =
		          new BufferedOutputStream(new FileOutputStream(new File(fileName)));
		        stream.write(fileContent);
		        stream.close();
	}


	public static Set<PosixFilePermission> getPermissions777(){
		//using PosixFilePermission to set file permissions 777
        Set<PosixFilePermission> perms = new HashSet<PosixFilePermission>();
        //add owners permission
        perms.add(PosixFilePermission.OWNER_READ);
        perms.add(PosixFilePermission.OWNER_WRITE);
        perms.add(PosixFilePermission.OWNER_EXECUTE);
        //add group permissions
        perms.add(PosixFilePermission.GROUP_READ);
        perms.add(PosixFilePermission.GROUP_WRITE);
        perms.add(PosixFilePermission.GROUP_EXECUTE);
        //add others permissions
        perms.add(PosixFilePermission.OTHERS_READ);
        perms.add(PosixFilePermission.OTHERS_WRITE);
        perms.add(PosixFilePermission.OTHERS_EXECUTE);
        return perms;
    }

	public static Set<PosixFilePermission> getPermissions775(){
		//using PosixFilePermission to set file permissions 775
        Set<PosixFilePermission> perms = new HashSet<PosixFilePermission>();
        //add owners permission
        perms.add(PosixFilePermission.OWNER_READ);
        perms.add(PosixFilePermission.OWNER_WRITE);
        perms.add(PosixFilePermission.OWNER_EXECUTE);
        //add group permissions
        perms.add(PosixFilePermission.GROUP_READ);
        perms.add(PosixFilePermission.GROUP_WRITE);
        perms.add(PosixFilePermission.GROUP_EXECUTE);
        //add others permissions
        perms.add(PosixFilePermission.OTHERS_READ);
        perms.add(PosixFilePermission.OTHERS_EXECUTE);
        return perms;
    }


	public static Set<PosixFilePermission> getReadPermissions(){
		//using PosixFilePermission to set file permissions 775
        Set<PosixFilePermission> perms = new HashSet<PosixFilePermission>();
        //add others permissions
        perms.add(PosixFilePermission.OTHERS_READ);
        perms.add(PosixFilePermission.OTHERS_EXECUTE);
        return perms;
    }

	public static void setPermissions(String dir, Set<PosixFilePermission> perms) throws IOException {
		// Set permissions recursively
		File path = new File(dir);
		if(path.isDirectory()){
			Tools.setPermissions(path, perms);
		}

	}

	public static void setPermissions(File dir, Set<PosixFilePermission> perms) throws IOException{
		Tools.setPermission(dir.getAbsolutePath(), perms);
		if(dir != null){
			for(File d: dir.listFiles()){
				if(d != null && d.isDirectory()){
					Tools.setPermissions(d, perms);
				}
			}
		}
	}

	public static void setPermission(String fileName, Set<PosixFilePermission> perms) throws IOException{
		if(perms == null) perms = Tools.getPermissions777();
		logger.info("Set permission for {}", fileName);
		for(PosixFilePermission p: perms){
			logger.info("permission {}", p);
		}
		Files.setPosixFilePermissions(Paths.get(fileName), perms);
		/**
		Map<String, Object> owner = Files.readAttributes(Paths.get(fileName), "posix:owner", LinkOption.NOFOLLOW_LINKS);
		for(String key: owner.keySet()){
			String value = String.valueOf(owner.get(key));
			logger.info(key + ": " + value);
			if(value.toLowerCase().contains("tomcat")){
				Files.setPosixFilePermissions(Paths.get(fileName), perms);
				break;
			}
		}
		*/
	}

	public static void setReadPermissions(String dir) throws IOException, InterruptedException{
    	String command = "chmod a+rx -R " + dir;
    	logger.debug("Execute: {}", command);
    	Process permProcess = Runtime.getRuntime().exec(command);
    	if(permProcess.waitFor() == 0){
    		logger.debug("completed");
    	}
    }
}
