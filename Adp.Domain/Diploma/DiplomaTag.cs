namespace Adp.Domain.Diploma;

public sealed class DiplomaTag
{
    public static DiplomaTag Create(
        long diplomaId,
        string name
    )
    {
        return new DiplomaTag(
            diplomaId: diplomaId,
            name: name
        );
    }

    public long DiplomaTagId { get; private set; }
    public long DiplomaId { get; private set; }
    public string Name { get; private set; }

    
    private DiplomaTag()
    {
        
    }
    
    private DiplomaTag(
        long diplomaId,
        string name
    )
    {
        DiplomaId = diplomaId;
        Name = name;
    }
}