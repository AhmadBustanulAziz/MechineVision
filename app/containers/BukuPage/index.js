import React, { Component } from 'react';

export default class BukuPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arc: 0,
      index: '',
      datas: [],
    };
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  create = e => {
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    let published = this.refs.published.value;
    let author = this.refs.author.value;
    if (this.state.arc === 0) {
      //new
      let data = {
        name,
        description,
        published,
        author,
      };
      datas.push(data);
    } else {
      //update
      let index = this.state.index;
      datas[index].name = name;
      datas[index].description = description;
      datas[index].published = published;
      datas[index].author = author;
    }
    this.setState({
      datas: datas,
      arc: 0,
    });

    this.refs.form.reset();
    this.refs.name.focus();
  };

  remove = () => {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas,
    });

    this.refs.form.reset();
    this.refs.title.focus();
  };

  edit = i => {
    let data = this.state.datas[i];
    this.refs.name.value = data.name;
    this.refs.description.value = data.description;
    this.refs.published.value = data.published;
    this.refs.author.value = data.author;

    this.setState({
      arc: 1,
      index: i,
    });

    this.refs.name.focus();
  };
  render() {
    let datas = this.state.datas;
    return (
      <div>
        <form ref="form">
          <div>
            <label>Title</label>
            <input ref="name" type="text" placeholder="Title" />
          </div>
          <div>
            <label>Description</label>
            <input ref="description" type="text" placeholder="Description" />
          </div>{' '}
          <div>
            <label>Published</label>
            <input ref="published" type="text" placeholder="Published" />
          </div>{' '}
          <div>
            <label>Author</label>
            <input ref="author" type="text" placeholder="Author" />
          </div>
          <button onClick={e => this.create(e)}>Create</button>
        </form>
        <pre>
          {datas.map((data, i) => (
            <li key={i} className="myList">
              {data.name}, {data.description}, {data.published}, {data.author}
              <button onClick={() => this.remove(i)}>Remove</button>
              <button onClick={() => this.edit(i)}>Edit</button>
            </li>
          ))}
        </pre>
      </div>
    );
  }
}
