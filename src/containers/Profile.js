import React, { Component } from "react";
import axios from "axios";
import { Link } from "../components/Link/Link";
import { List } from "../components/List/List";
import styled from "styled-components";

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;

const Avatar = styled.img`
  width: 150px;
`;

export class Profile extends Component {
  state = {
    data: {},
    repositories: [],
    loading: true,
  };

  componentDidMount() {
    axios.get("https://api.github.com/users/mona95").then((res) => {
      if (res.status === 200) {
        axios.get("https://api.github.com/users/Mona95/repos").then((repo) => {
          res.status === 200 &&
            this.setState({
              data: res.data,
              repositories: repo.data,
              loading: false,
            });
        });
      }
    });
  }
  render() {
    const { data, loading, repositories } = this.state;
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

    const projects = repositories.map((repository) => ({
      label: repository.name,
      value: <Link url={repository.html_url} title="Github URL" />,
    }));
    console.log(projects);
    return (
      <ProfileWrapper>
        <Avatar className="Profile-avatar" src={data.avatar_url} alt="avatar" />
        <List title="Profile" items={items} />
        <List title="Projects" items={projects} />
      </ProfileWrapper>
    );
  }
}
