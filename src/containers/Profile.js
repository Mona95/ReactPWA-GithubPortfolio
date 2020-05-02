import React, { Component } from "react";
import axios from "axios";
import { Link } from "../components/Link/Link";
import { List } from "../components/List/List";
import "./Profile.css";

export class Profile extends Component {
  state = {
    data: {},
    loading: true,
  };

  componentDidMount() {
    axios.get("https://api.github.com/users/mona95").then((res) => {
      res.status === 200 &&
        this.setState({
          data: res.data,
          loading: false,
        });
    });
  }
  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <div>loading...</div>;
    }

    const items = [
      {
        label: "html_url",
        value: <Link url={data.html_url} title="Github URL" />,
      },
      { label: "repos_url", value: data.repos_url },
      { label: "name", value: data.name },
      { label: "company", value: data.company },
      { label: "location", value: data.location },
      { label: "email", value: data.email },
      { label: "bio", value: data.bio },
    ];
    return (
      <div className="Profile-container">
        <img className="Profile-avatar" src={data.avatar_url} alt="avatar" />
        <List items={items} />
      </div>
    );
  }
}
