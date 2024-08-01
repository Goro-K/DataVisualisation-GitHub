interface GitHubInformationProps {
  accountInfo: any;
  commits: any[];
}

const GitHubInformation: React.FC<GitHubInformationProps> = ({
  accountInfo,
  commits,
}) => (
  <>
    <div>
      <h2>Informations du compte GitHub</h2>
      <p>
        <strong>Nom:</strong> {accountInfo.name}
      </p>
      <p>
        <strong>Nom d'utilisateur:</strong> {accountInfo.login}
      </p>
      <p>
        <strong>Bio:</strong> {accountInfo.bio}
      </p>
      <p>
        <strong>Nombre de dépôts publics:</strong> {accountInfo.public_repos}
      </p>
      <p>
        <strong>Nombre de followers:</strong> {accountInfo.followers}
      </p>
      <p>
        <strong>Nombre de personnes suivies:</strong> {accountInfo.following}
      </p>
      {commits.length > 0 && (
        <div>
          <h2>Commits récents</h2>
          <ul>
            {commits.map((commit, index) => (
              <li key={index}>
                <strong>{commit.repo}</strong>: {commit.commit_message} (
                {new Date(commit.commit_date).toLocaleString()})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </>
);

export default GitHubInformation;
