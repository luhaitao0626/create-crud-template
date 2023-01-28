export type I<%=entityInitial%> = {
    <% fieldNames.forEach(field=>{ %>
        <%=field%> : <%=fields[field].prop.name.toLowerCase()%>
    <% }) %>
}
