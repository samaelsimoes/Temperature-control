using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        await EnviarRequisicao();
    }

    static async Task EnviarRequisicao()
    {
        string url = "http://127.0.0.1:5000/dados_iot";

        // Dados do dispositivo IoT no formato JSON
        string dadosJson = "{\"id\":\"1\",\"data\":\"07/12/2023\",\"consumo\":\"15\",\"potencia\":\"3000\",\"tempo_ligado\":\"600000\"}";

        // Criar uma instância de HttpClient
        using (HttpClient httpClient = new HttpClient())
        {
            // Configurar o cabeçalho Content-Type para application/json
            httpClient.DefaultRequestHeaders.Add("Content-Type", "application/json");

            // Criar o conteúdo da requisição
            StringContent content = new StringContent(dadosJson, Encoding.UTF8, "application/json");

            // Enviar a requisição POST
            HttpResponseMessage response = await httpClient.PostAsync(url, content);

            // Verificar a resposta
            if (response.IsSuccessStatusCode)
            {
                string respostaJson = await response.Content.ReadAsStringAsync();
                Console.WriteLine(respostaJson);
            }
            else
            {
                Console.WriteLine($"Erro na requisição: {response.StatusCode}");
            }
        }
    }
}
