const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'eruss',
  api_key: '445832364688451',
  api_secret: '4sQfOHMgSk4CDlLVI8INQ1zwu0o',
});

exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: 'auto',
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  let imageId = req.body.public_id;
  cloudinary.uploader.destroy(imageId, (err, result) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
      });
    }
  });
};
