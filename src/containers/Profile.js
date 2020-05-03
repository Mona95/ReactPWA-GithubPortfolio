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
  border-radius: 10px;
`;

const PageNumberLi = styled.li`
  margin-right: 0.3em;
  color: blue;
  user-select: none;
  cursor: pointer;
`;

const PageNumberList = styled.ul`
  margin: 0px auto;
  list-style: none;
  display: flex;
`;

export class Profile extends Component {
  state = {
    data: {},
    repositories: [],
    loading: true,
    currentPage: 1,
    repoPerPage: 10,
    error: "",
  };

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id),
    });
  };

  componentDidMount() {
    try {
      axios.get("https://api.github.com/users/mona95").then((res) => {
        if (res.status === 200) {
          axios
            .get("https://api.github.com/users/Mona95/repos")
            .then((repo) => {
              res.status === 200 &&
                this.setState({
                  data: res.data,
                  repositories: repo.data,
                  loading: false,
                });
            });
        }
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: error.message,
      });
    }
  }
  render() {
    const {
      data,
      loading,
      repositories,
      currentPage,
      repoPerPage,
      error,
    } = this.state;

    let indexOfLastRepo = currentPage * repoPerPage,
      indexOfFirstRepo = indexOfLastRepo - repoPerPage,
      currentRepoPage = repositories.slice(indexOfFirstRepo, indexOfLastRepo);

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

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(repositories.length / repoPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <PageNumberLi key={number} id={number} onClick={this.handleClick}>
          {number}
        </PageNumberLi>
      );
    });

    const projects = currentRepoPage.map((repository) => ({
      label: repository.name,
      value: <Link url={repository.html_url} title="Github URL" />,
    }));

    if (loading || error) {
      return <div>{loading ? "Loading..." : error}</div>;
    }
    return (
      <ProfileWrapper>
        <Avatar src={data.avatar_url} alt="avatar" />
        <List title="Profile" items={items} />
        <List title="Projects" items={projects} />
        <PageNumberList>{renderPageNumbers}</PageNumberList>
      </ProfileWrapper>
    );
  }
}
