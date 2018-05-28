var transformer = require("../core/Transformer.js")['ios']
var EOL = require('os').EOL

exports.testComment = function(test) {
  var result = transformer.transformComment('un commentaire');

  test.equal('// un commentaire', result)
  test.done()
}

exports.testKeyValue = function(test) {
  var line = transformer.transformKeyValue('ma_cle', 'La valeur')
  test.equal('"ma_cle" = "La valeur";', line)

  test.done()
}

exports.testEscapeQuote = function(test) {
  var line = transformer.transformKeyValue('ma_cle', 'La "valeur"')
  test.equal('"ma_cle" = "La \\"valeur\\"";', line)

  test.done()
}

exports.testInsert_WhenNotEmpty_ShouldInsertAfter = function(test) {
  var result = transformer.insert('// header' + EOL + '"aa" = "bb";' + EOL, 'à insérer')
  test.equal('// header' + EOL + '"aa" = "bb";' + EOL + transformer.AUTOGENERATED_TAG + EOL + 'à insérer', result)

  test.done()
}

exports.testInsert_WhenHasAutoGeneratedTag_ShouldReplaceIt = function(test) {
  var result = transformer.insert('// header' + EOL + transformer.AUTOGENERATED_TAG + EOL + 'à effacer', 'à insérer')
  test.equal('// header' + EOL +
      transformer.AUTOGENERATED_TAG + EOL +
      'à insérer', result)

  test.done()
}

exports.test_Insert_AfterIsSameAsBeforeIfNewValueDontChange = function(test) {
  var before = '// header' + EOL + transformer.AUTOGENERATED_TAG + EOL + 'before'
  var result = transformer.insert(before, 'before')
  test.equal(before, result)

  test.done()
}
