namespace Adp.Domain.Diploma;

public sealed class DiplomaTag
{
    public static DiplomaTag Create(
        string name,
    )
    {
        return new DiplomaTag(
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
        string name
    )
    {
        Name = name;
    }
}