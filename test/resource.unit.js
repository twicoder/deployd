var Resource = require('../lib/resource');

describe('resource', function(){
  
  describe('.parse(url)', function(){
    function example(url, basepath, id, parts, query) {
      var result = Resource.prototype.parse(url);
      
      expect(result).to.be.a('object');
      expect(result.basepath).to.equal(basepath);
      expect(result.id).to.equal(id);
      expect(result.parts).to.eql(parts);
      expect(result.query).to.eql(query || {});
    }
    
    it('should return a parsed url', function() {
      example('/foo/7?q=bar', 'foo', '7', ['foo', '7'], {q: 'bar'});
      example('/foo/bat', 'foo', 'bat', ['foo', 'bat']);
      example('/foo/bat/baz', 'foo', 'baz', ['foo', 'bat', 'baz']);
      // should also auto encode q={...}
      example('/foo/boo/bar/baz?q=' + encodeURI(JSON.stringify({"a":"b"})), 'foo', 'baz', ['foo', 'boo', 'bar', 'baz'], {'q':{'a': 'b'}});
    })
  })
  
  describe('.handle(req, res)', function(){
    it('should respond with 200 OK', function(done) {
      var r = new Resource({path: '/foo'});
      
      freq('/foo', null, function (req, res) {
        r.handle(req, res);
      }, function (req, res) {
        expect(res.statusCode).to.equal(200);
        done();
      })
    })
  })
})