export type I<%=entityInitial%>Query = {
    <% queryFields.forEach(field=>{ %>
        <%=field%> : <%=fields[field].prop.name.toLowerCase()%>
    <% }) %>
}