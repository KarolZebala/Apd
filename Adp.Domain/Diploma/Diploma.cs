namespace Adp.Domain.Diploma;

public sealed class Diploma
{
    public static Diploma Create(
        string title
    )
    {
        return new Diploma(
            title: title
        );
    }
    
    public long DiplomaId { get; private set; }
    public string Title { get; private set; }
    
    private Diploma(string title)
    {
        Title = title;
    }
}