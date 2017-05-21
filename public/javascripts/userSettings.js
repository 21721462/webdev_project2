function setSelected(selected)
{
    var s = document.getElementsByName('location')[0];
    for (var i = 0; i < s.options.length; i++) {
        if (s.options[i].value == selected) {
            s.options[i].selected = 'selected';
            break;
        }
    }
}