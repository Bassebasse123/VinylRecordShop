class ApiQueryHandler {
  constructor(model, queryObj) {
    this.model = model;
    this.queryObj = queryObj;
  }

  //! http://localhost:8000/[resource-name]?[query-string]
  //* record example: http://localhost:8000/records?price=17
  //* user example:   http://localhost:8000/users?age[gte]=41

  filterDocs() {
    let queryObjCopy = { ...this.queryObj };
    let excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObjCopy[el]);

    let queryStr = JSON.stringify(queryObjCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);

    this.model = this.model.find(JSON.parse(queryStr));

    return this;
  }

  //! http://localhost:8000/[resource-name]?sort=[critiria]
  //* user example:   http://localhost:8000/users?sort=age
  //* record example: http://localhost:8000/records?sort=price,year

  sortDocs() {
    if (this.queryObj.sort) {
      const critirias = this.queryObj.sort.split(",").join(" ");
      this.model = this.model.sort(critirias);
    }
    return this;
  }

  //! http://localhost:8000/[resource-name]?field=[field-name]
  //* user example: http://localhost:8000/users?field=age
  //* record example: http://localhost:8000/records?field=title

  limitFields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(",").join(" ");
      this.model = this.model.select(fields);
    } else {
      this.model = this.model.select("-__v");
    }
    return this;
  }

  //! http://localhost:8000/[resource-name]?page=[page-number]&limit=[number-of-docs]
  //* user example: http://localhost:8000/users?page=2&limit=5
  //* record example: http://localhost:8000/records?page=1&limit=3
  paginateDocs() {
    if (this.queryObj.page && this.queryObj.limit) {
      const page = this.queryObj.page * 1 || 1;
      const limit = this.queryObj.limit * 1 || 5;
      const skip = (page - 1) * limit;
      this.model = this.model.skip(skip).limit(limit);
    }
    return this;
  }
}

export default ApiQueryHandler;
