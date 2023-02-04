import { Container } from "../../../common/Container";
import PageHeader from "../../../common/PageHeader";
import Pagination from "../../../common/Pagination";
import { PersonTile } from "../../../common/PersonTile";
import { Layout } from "../../../common/Layout/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPeople,
  selectError,
  selectLoading,
  selectPeople,
} from "../peopleSlice";
import { useEffect } from "react";
import ErrorPage from "../../../common/ErrorPage";
import Loader from "../../../common/Loader";
import { APIImageUrl } from "../../dataAPI";
import { TileLink } from "../../../common/TileLink";

const PeopleListPage = () => {
  const dispatch = useDispatch();
  const popularPeople = useSelector(selectPeople);
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchPeople());
  }, [dispatch]);

  return (
    <>
      <Container>
        {error ? (
          <ErrorPage />
        ) : loading ? (
          <>
            <PageHeader title="Popular people" />
            <Loader />
          </>
        ) : (
          <>
            <PageHeader title="Popular " />
            <Layout>
              {popularPeople?.map((person) => (
                <TileLink to={`/people/${person.id}`} key={person.id}>
                  <PersonTile
                    key={person.id}
                    profile={`${APIImageUrl}/original${person.profile_path}`}
                    profilePath={person.profile_path}
                    fullName={person.name}
                  />
                </TileLink>
              ))}
            </Layout>
            <Pagination />
          </>
        )}
      </Container>
    </>
  );
};

export default PeopleListPage;
