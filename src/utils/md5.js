import md5 from 'js-md5';

function paramsStrSort (paramsStr) {
  var orsign = paramsStr.split("&").sort().join("&");
  orsign = orsign + '&key=@234%67g12q4*67m12#4l67!';
  console.log("签名:" + orsign);
  return md5(orsign).toLowerCase();
}

export function paramsign (params) {
  var arr = [];
  for (var i in params) {
    if (i != "Sign")
      arr.push((i + "=" + params[i]));
  }
  params.Sign = paramsStrSort(arr.join(("&")));
  return params
}