<%--
  Created by IntelliJ IDEA.
  User: root
  Date: 16-7-24
  Time: 下午5:28
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <title>Title</title>
    <script type="text/javascript">
     var username=${pageContext.request.getAttribute("username")};
        alert(username);
    </script>

</head>
<body>

</body>
</html>
