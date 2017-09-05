using System;
using System.Collections.Generic;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using System.Linq;
using System.Threading;

// Please do not read this. I mean, really don't. I barely know C# :(


public class CredentialsDto
{
    public string username, password;
}

public class AuthResponseDto 
{
    public string access_token;
}

public class PostMessageDto 
{
    public int conversationId;
    public string type = "CHANNEL";
    public string text;
}

public class MessageDto 
{
    public int id;
    public string text;
}


public class Bot 
{

    private string baseUrl, username, password, authToken;
    private int channelId;

    private Dictionary<string, List<string>> mappings = new Dictionary<string, List<string>>();

    private List<int> alreadyProcessedIds = new List<int>();
    private Random random = new Random();


    public Bot(string baseUrl, string username, string password, int channelId)
    {
        this.baseUrl = baseUrl;
        this.username = username;
        this.password = password;
        this.channelId = channelId;

        mappings["cześć"] = new List<string> { "hejka", "witam", "cześć" };
        mappings["co robisz"] = new List<string> { "piszę z Tobą", "nic", "czekam na Twoją wiadomość" };
        mappings["lubisz mnie"] = new List<string> { "tak", "nie", "być może"};
    }

    public void LogIn()
    {
        Console.WriteLine("Trying to log in as " + username + "/" + password + " on " + baseUrl);
        HttpClient client = new HttpClient();

        CredentialsDto credentials = new CredentialsDto() { username = username, password = password };

        var data = new StringContent(JsonConvert.SerializeObject(credentials));

        var response = client.PostAsync(baseUrl + "/api/login", data).Result;

        authToken = JsonConvert.DeserializeObject<AuthResponseDto>(
            response.Content.ReadAsStringAsync().Result
        ).access_token;
        Console.WriteLine("Login successful, token = " + authToken.Substring(0, 10) + "...");
    }

    public int PostMessage(string text)
    {
        Console.WriteLine("Posting new message '" + text + "'");
        HttpClient client = authHttpClient();

        var dto = new PostMessageDto() { text = text, conversationId = channelId};

        StringContent dtoJson = new StringContent(
                JsonConvert.SerializeObject(dto), Encoding.UTF8, "application/json"
        );

        var response = client.PostAsync(baseUrl + "/api/message/create", dtoJson).Result;

        MessageDto message = JsonConvert.DeserializeObject<MessageDto>( 
                response.Content.ReadAsStringAsync().Result
        );

        Console.WriteLine("Posted successfully, id = " + message.id);
        return message.id;
    }


    public void ProcessMessages(List<MessageDto> messages) 
    {
        Console.WriteLine("Processing messages");

        foreach (MessageDto msg in messages.Where(m => !alreadyProcessedIds.Contains(m.id))) 
        {

            alreadyProcessedIds.Add(msg.id);

            // allow multiple responses
            foreach (var item in mappings.Where(item => msg.text.ToLower().Contains(item.Key))) 
            {
                Console.WriteLine("Responding to id = " + msg.id + " '" + msg.text + "'");
                int messageResponseId = PostMessage(item.Value[random.Next(item.Value.Count)]);
                alreadyProcessedIds.Add(messageResponseId);
            }
        }
    }

    public void Loop() 
    {
        ProcessMessages(ListMessages());
    }

    public List<MessageDto> ListMessages() 
    {
        Console.WriteLine("Listing messages");
        HttpClient client = authHttpClient();

        var response = client.GetAsync(baseUrl + "/api/message/listAll?conversationId=" + channelId + "&type=CHANNEL")
        .Result;

        return JsonConvert.DeserializeObject<List<MessageDto>>(
                 response.Content.ReadAsStringAsync().Result
        );
    }

    private HttpClient authHttpClient() 
    {
        HttpClient client = new HttpClient();
        client.DefaultRequestHeaders.Add("Authorization", "Bearer " + authToken);
        return client;
    }
}


public class Program  
{

    public static void Main(string[] args)
    {
        Console.WriteLine("Starting answer bot");
        
        string backendUrl = Environment.GetEnvironmentVariable("BACKEND_URL") ?? "http://localhost:8080";
        string chatUsername = Environment.GetEnvironmentVariable("BOT_USERNAME") ?? "bob";
        string chatPassword = Environment.GetEnvironmentVariable("BOT_PASSWORD") ?? "bob";
        int chatConversationId = Int32.Parse(Environment.GetEnvironmentVariable("CHAT_CONVERSATION_ID") ?? "2"); // :)
        
        Bot bot = new Bot(backendUrl, chatUsername, chatPassword, chatConversationId);

        bot.LogIn();

        Console.WriteLine("Entering main loop");
        while (true) {
            bot.Loop();
            Thread.Sleep(1000);
        }
    }
}
